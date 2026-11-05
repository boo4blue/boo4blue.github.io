#!/bin/bash
# emu FAST LANE v2 (Cloud PC edition): KVM runner, 4 cores / 4096 MB,
# swangle GPU, google_apis image (fat APK also carries x86_64 libs),
# quickboot snapshot cold-vs-warm boot measurement, Roblox staged to
# its login screen. NO sign-in, NO credentials anywhere in this flow.
# Modes: setup | cold | warm. Config (emu/config.env): PACKAGE, APKURL.
# Invoked from cloud-pc/storage cwd, exactly like run10.sh.
SDK=$HOME/.cache/cloudpc-models/android-sdk
SYS_SDK=/usr/local/lib/android/sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
mkdir -p $SDK emu $ANDROID_AVD_HOME
SDKM="$SDK/cmdline-tools/latest/bin/sdkmanager --sdk_root=$SDK"
AVDM="$SDK/cmdline-tools/latest/bin/avdmanager"
UA="Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120.0 Mobile Safari/537.36"
AVD=fastlane34
IMG=google_apis
GPU=swangle_indirect
tapfrac() {
  local fx=${1%,*} fy=${1#*,}
  adb shell input tap $(awk -v w=$W -v h=$H -v x=$fx -v y=$fy 'BEGIN{printf "%d %d", w*x, h*y}')
}
bootwait() { # echoes seconds-to-boot_completed on stdout, returns 0/1
  local t0=$(date +%s) i b
  timeout 150 adb wait-for-device >/dev/null 2>&1
  for i in $(seq 1 90); do
    b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
    if [ "$b" = "1" ]; then echo $(( $(date +%s) - t0 )); return 0; fi
    sleep 2
  done
  echo -1; return 1
}
mode=$1
if [ "$mode" = setup ]; then
  if [ -x $SDK/emulator/emulator ] && [ -f $SDK/system-images/android-34/google_apis/x86_64/system.img ] && [ -f $SDK/system-images/android-34/default/x86_64/system.img ]; then
    echo "SETUP_CACHE_HIT: SDK + both images already in Actions cache, sdkmanager skipped"
    echo FAST_SETUP_DONE
    exit 0
  fi
  if [ ! -d $SDK/cmdline-tools/latest ]; then
    mkdir -p $SDK/cmdline-tools
    cp -r $SYS_SDK/cmdline-tools/latest $SDK/cmdline-tools/latest
  fi
  echo 'KERNEL=="kvm", GROUP="kvm", MODE="0666", OPTIONS+="static_node=kvm"' | sudo tee /etc/udev/rules.d/99-kvm4all.rules >/dev/null
  sudo udevadm control --reload-rules; sudo udevadm trigger --name-match=kvm; sleep 1
  yes | $SDKM --licenses > emu/licenses.log 2>&1
  for attempt in 1 2 3; do
    $SDKM "emulator" "platform-tools" "platforms;android-34" "system-images;android-34;google_apis;x86_64" "system-images;android-34;default;x86_64" > emu/setup.log 2>&1
    echo "attempt $attempt sdkmanager exit=$?"
    if [ -x $SDK/emulator/emulator ] && [ -f $SDK/system-images/android-34/google_apis/x86_64/system.img ] && [ -f $SDK/system-images/android-34/default/x86_64/system.img ]; then
      echo "SDK verified OK on attempt $attempt"
      break
    fi
    rm -rf $SDK/emulator $SDK/.temp
    sleep 5
  done
  echo FAST_SETUP_DONE
fi
if [ "$mode" = cold ] || [ "$mode" = warm ]; then
  export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
  PACKAGE=com.roblox.client
  APKURL=
  [ -f emu/config.env ] && . emu/config.env
  echo "mode=$mode gpu=$GPU img=$IMG package=$PACKAGE"
  if [ ! -x $SDK/emulator/emulator ]; then echo "FATAL: emulator missing"; exit 1; fi
  pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
fi
if [ "$mode" = cold ]; then
  curl -sL --retry 3 -A "$UA" -o /tmp/fastlane.apk "$APKURL"
  ls -la /tmp/fastlane.apk; md5sum /tmp/fastlane.apk
  AAPT=$(ls $SYS_SDK/build-tools/*/aapt 2>/dev/null | sort -V | tail -1)
  [ -z "$AAPT" ] && AAPT=$(ls $SDK/build-tools/*/aapt 2>/dev/null | sort -V | tail -1)
  echo "aapt=$AAPT"
  PKGLINE=$($AAPT dump badging /tmp/fastlane.apk 2>/dev/null | grep '^package:')
  echo "AAPT_BADGING: $PKGLINE"
  case "$PKGLINE" in *"name='$PACKAGE'"*) echo "PKG_VERIFY_OK";; *) echo "PKG_VERIFY_FAIL";; esac
  echo no | $AVDM create avd -n $AVD -k "system-images;android-34;$IMG;x86_64" -d pixel_6 --force > emu/avd-cold.log 2>&1
  nohup $SDK/emulator/emulator -avd $AVD -no-window -no-audio -no-boot-anim -gpu $GPU -feature -Vulkan -memory 4096 -cores 4 -accel on -no-snapshot-load -no-snapshot-save > emu/boot-cold.log 2>&1 &
  BOOTSEC=$(bootwait); BRC=$?
  echo "boot_completed_rc=$BRC BOOT_COLD_SECONDS=$BOOTSEC"
  if [ "$BRC" != "0" ]; then tail -8 emu/boot-cold.log; echo COLD_DONE; exit 0; fi
  adb shell settings put global window_animation_scale 0
  adb shell settings put global transition_animation_scale 0
  adb shell settings put global animator_duration_scale 0
  echo "ANIM_SCALES_SET"
  SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1)
  W=${SZ%x*}; H=${SZ#*x}
  echo "screen=${W}x${H}"
  adb install -r /tmp/fastlane.apk > emu/install-fastlane.log 2>&1
  echo "--- install log:"; cat emu/install-fastlane.log
  if adb shell pm list packages | grep -qx "package:$PACKAGE"; then echo "PKG_PRESENT=1"; else echo "PKG_PRESENT=0"; fi
  adb shell input keyevent 3; sleep 3
  adb exec-out screencap -p > emu/shot-fast-home.png
  ls -la emu/shot-fast-home.png
  adb shell input swipe $((W/2)) $((H*85/100)) $((W/2)) $((H*45/100)) 120; sleep 2
  adb shell input tap $((W/2)) $((H*7/100)); sleep 1
  adb shell input text "Roblox"; sleep 2
  adb exec-out screencap -p > emu/shot-fast-drawer.png
  ls -la emu/shot-fast-drawer.png
  adb shell input keyevent 3; sleep 1
  adb logcat -c
  adb shell monkey -p $PACKAGE -c android.intent.category.LAUNCHER 1 2>&1 | tail -1
  sleep 15
  tapfrac 0.80,0.27
  sleep 6
  echo "--- pid@launch:"; adb shell pidof $PACKAGE
  adb exec-out screencap -p > emu/shot-fast-login1.png
  ls -la emu/shot-fast-login1.png
  adb shell uiautomator dump /sdcard/win.xml >/dev/null 2>&1
  adb pull /sdcard/win.xml emu/login-window.xml >/dev/null 2>&1
  TAPXY=$(python3 -c "
import re
try:
    x = open('emu/login-window.xml').read()
except Exception:
    x = ''
m = re.search(r'text=\"Log ?In\"[^>]*bounds=\"\[(\d+),(\d+)\]\[(\d+),(\d+)\]\"', x)
if not m:
    m = re.search(r'content-desc=\"Log ?In\"[^>]*bounds=\"\[(\d+),(\d+)\]\[(\d+),(\d+)\]\"', x)
if m:
    print('%d %d' % ((int(m.group(1))+int(m.group(3)))//2, (int(m.group(2))+int(m.group(4)))//2))
" 2>/dev/null)
  if [ -n "$TAPXY" ]; then
    echo "LOGIN_BUTTON_AT=$TAPXY"
    adb shell input tap $TAPXY; sleep 5
    adb exec-out screencap -p > emu/shot-fast-login2.png
    ls -la emu/shot-fast-login2.png
  else
    echo "LOGIN_BUTTON_NOT_IN_UIDUMP (Roblox renders its own UI; login1 shot stands)"
  fi
  echo "--- pid@end:"; adb shell pidof $PACKAGE
  adb logcat -d -t 3000 > emu/logcat-fast.txt 2>&1
  T0S=$(date +%s)
  timeout 180 adb emu avd snapshot save fastlane; echo "snapshot save exit=$? SNAPSHOT_SAVE_SECONDS=$(( $(date +%s) - T0S ))"
  adb emu kill 2>/dev/null
  rm -f /tmp/fastlane.apk
  echo COLD_DONE
fi
if [ "$mode" = warm ]; then
  nohup $SDK/emulator/emulator -avd $AVD -no-window -no-audio -no-boot-anim -gpu $GPU -feature -Vulkan -memory 4096 -cores 4 -accel on -snapshot fastlane -no-snapshot-save > emu/boot-warm.log 2>&1 &
  BOOTSEC=$(bootwait); BRC=$?
  echo "boot_completed_rc=$BRC BOOT_WARM_SECONDS=$BOOTSEC"
  if [ "$BRC" != "0" ]; then tail -8 emu/boot-warm.log; echo WARM_DONE; exit 0; fi
  sleep 3
  echo "--- pid@warm:"; adb shell pidof $PACKAGE
  adb exec-out screencap -p > emu/shot-fast-warm.png
  ls -la emu/shot-fast-warm.png
  adb emu kill 2>/dev/null
  echo WARM_DONE
fi
