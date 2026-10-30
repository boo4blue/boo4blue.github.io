#!/bin/bash
# emu-test: Neon Tower run — seeds a save (tutorial done) so Home is idle,
# screenshots Home, taps BATTLE, screenshots live battle twice.
SDK=$HOME/.cache/cloudpc-models/android-sdk
SYS_SDK=/usr/local/lib/android/sdk
export ANDROID_HOME=$SDK ANDROID_SDK_ROOT=$SDK
export ANDROID_AVD_HOME=$HOME/emu-avd-home
mkdir -p $SDK emu $ANDROID_AVD_HOME
AVDM="$SDK/cmdline-tools/latest/bin/avdmanager"
export PATH=$SDK/platform-tools:$SDK/emulator:$PATH
PACKAGE=com.onion.neontower
APKURL=https://github.com/boo4blue/boo4blue.github.io/releases/download/emu-assets/NeonTower-emu.apk
TAG=NT
tapfrac() {
  local fx=${1%,*} fy=${1#*,}
  adb shell input tap $(awk -v w=$W -v h=$H -v x=$fx -v y=$fy 'BEGIN{printf "%d %d", w*x, h*y}')
}
if [ ! -x $SDK/emulator/emulator ]; then echo "FATAL: emulator missing (run setup first)"; exit 1; fi
pkill -f qemu-system 2>/dev/null; sleep 2; adb kill-server 2>/dev/null; sleep 1
curl -sL --retry 2 -o /tmp/test-$TAG.apk "$APKURL"
ls -la /tmp/test-$TAG.apk; md5sum /tmp/test-$TAG.apk
echo no | $AVDM create avd -n dc$TAG -k "system-images;android-34;default;x86_64" -d pixel_6 --force > emu/avd-$TAG.log 2>&1
nohup $SDK/emulator/emulator -avd dc$TAG -no-window -no-audio -no-boot-anim -gpu angle_indirect -feature -Vulkan -memory 2048 -accel on -no-snapshot > emu/boot-$TAG.log 2>&1 &
timeout 150 adb wait-for-device
ok=0
for i in $(seq 1 40); do
  b=$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')
  if [ "$b" = "1" ]; then ok=1; echo "booted after ~$((i*5))s"; break; fi
  sleep 5
done
echo "boot_completed=$ok"
if [ "$ok" != "1" ]; then tail -8 emu/boot-$TAG.log; exit 0; fi
SZ=$(adb shell wm size | grep -o '[0-9]*x[0-9]*' | head -1)
W=${SZ%x*}; H=${SZ#*x}
echo "screen=${W}x${H}"
adb install -r /tmp/test-$TAG.apk 2>&1 | tail -1
adb logcat -c
# first launch creates the data dir (tutorial would auto-start; we reseed after)
adb shell monkey -p $PACKAGE -c android.intent.category.LAUNCHER 1 2>&1 | tail -1
sleep 10
adb shell am force-stop $PACKAGE
sleep 1
adb root > /dev/null 2>&1; sleep 2
cat > /tmp/nt_save.json <<'EOF'
{"coins": 5000.0, "gems": 300.0, "cores": 50.0, "shards": 40.0, "tutorial_done": true, "total_runs": 1, "total_kills": 120, "district_highest": {"plaza": 12}, "workshop_levels": {"damage": 3, "health": 2}, "buildings": {"hq": {"level": 1, "ready": 0.0, "last": 1761700000.0}, "extractor": {"level": 1, "ready": 0.0, "last": 1761700000.0}, "workshop_b": {"level": 1, "ready": 0.0, "last": 1761700000.0}}}
EOF
adb push /tmp/nt_save.json /data/data/$PACKAGE/files/neontower_save.json 2>&1 | tail -1
adb shell chmod 666 /data/data/$PACKAGE/files/neontower_save.json 2>/dev/null
echo "save seeded: $(adb shell ls -la /data/data/$PACKAGE/files/ 2>/dev/null | grep neontower || echo FAILED)"
adb shell settings put system accelerometer_rotation 1 2>/dev/null
adb shell settings put system user_rotation 0 2>/dev/null
adb shell monkey -p $PACKAGE -c android.intent.category.LAUNCHER 1 2>&1 | tail -1
sleep 12
tapfrac 0.66,0.49
sleep 3
echo "--- pid@home:"; adb shell pidof $PACKAGE
adb exec-out screencap -p > emu/shot-$TAG-home.png
tapfrac 0.5,0.66
sleep 10
echo "--- pid@battle1:"; adb shell pidof $PACKAGE
adb exec-out screencap -p > emu/shot-$TAG-battle1.png
sleep 16
adb exec-out screencap -p > emu/shot-$TAG-battle2.png
echo "--- pid@end:"; adb shell pidof $PACKAGE
adb logcat -d > emu/logcat-$TAG.txt 2>&1
adb emu kill 2>/dev/null
rm -f /tmp/test-$TAG.apk
echo RUN_DONE_$TAG
