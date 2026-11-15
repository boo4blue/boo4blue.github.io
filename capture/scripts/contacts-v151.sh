#!/bin/bash
# contacts-v151.sh — screen script for the Capture Lane acceptance run:
# the SHIPPED Onion Contacts v1.5.1 APK, exactly as a user sees it.
# Captures: (1) People list — full hint "Search people, notes, T9" + the
# single account selector row, NO chip strip; (2) the account menu open;
# (3) a person sheet. Runs inside run-capture.sh (helpers: shot, tapfrac,
# taptext, adb; $PACKAGE and $RESULTS set).
#
# DEMO DATA ONLY: invented names, 555 numbers, demo accounts. Never seed
# real user data into a capture — the screenshots get shown around.
set -u

# ---- seed contacts: two demo accounts + on-device ----
maxrid() {
  adb shell content query --uri content://com.android.contacts/raw_contacts --projection _id 2>/dev/null | grep -o '_id=[0-9]*' | cut -d= -f2 | sort -n | tail -1
}
seed() { # given family phone account_name account_type starred
  local prev rid
  prev=$(maxrid)
  if [ -n "$4" ]; then
    adb shell content insert --uri content://com.android.contacts/raw_contacts \
      --cv account_type:s:$5 --cv account_name:s:$4 --cv starred:i:$6 >/dev/null 2>&1
  else
    adb shell content insert --uri content://com.android.contacts/raw_contacts \
      --cv starred:i:$6 >/dev/null 2>&1
  fi
  rid=$(maxrid)
  if [ -z "$rid" ] || [ "$rid" = "$prev" ]; then echo "SEED FAIL $1 $2 (rid=$rid prev=$prev)"; return; fi
  echo "seed $1 $2 rid=$rid"
  adb shell content insert --uri content://com.android.contacts/data \
    --cv raw_contact_id:i:$rid --cv mimetype:s:vnd.android.cursor.item/name \
    --cv data1:s:"$1 $2" --cv data2:s:$1 --cv data3:s:$2 >/dev/null 2>&1
  adb shell content insert --uri content://com.android.contacts/data \
    --cv raw_contact_id:i:$rid --cv mimetype:s:vnd.android.cursor.item/phone_v2 \
    --cv data1:s:"$3" --cv data2:i:2 >/dev/null 2>&1
}
seed Avery Collins "(512) 555-0184" demo.alex@gmail.com com.google 1
seed Jordan Meyer "(512) 555-0119" demo.alex@gmail.com com.google 0
seed Priya Nair "(737) 555-0143" demo.sam@outlook.com com.google 0
seed Taylor Brooks "(929) 555-0128" demo.sam@outlook.com com.google 0
seed Sam Whitfield "(512) 555-0167" "" "" 0
echo "--- contacts in provider:"
adb shell content query --uri content://com.android.contacts/contacts --projection display_name 2>/dev/null | head -8

# ---- launch ----
adb logcat -c
adb shell monkey -p $PACKAGE -c android.intent.category.LAUNCHER 1 2>&1 | tail -1
sleep 12
tapfrac 0.80,0.27   # dismiss the "Viewing full screen / Got it" toast if up
sleep 3
echo "--- pid@people:"; adb shell pidof $PACKAGE

# ---- (1) People list ----
shot 01-people-list

# ---- (2) account menu: tap the single account selector row ----
if ! taptext "All accounts"; then
  echo "selector not found by text; falling back to fraction tap"
  tapfrac 0.5,0.145
fi
sleep 2
shot 02-account-menu
adb shell input keyevent BACK
sleep 1

# ---- (3) person sheet: open the first person ----
if ! taptext "Avery Collins"; then
  echo "person not found by text; falling back to fraction tap"
  tapfrac 0.5,0.36
fi
sleep 3
shot 03-person-sheet
echo "--- pid@end:"; adb shell pidof $PACKAGE
