#!/bin/bash

#https://pimylifeup.com/raspberry-pi-kiosk/

xset s noblank
xset s off
xset -dpms

unclutter -idle 0.5 -root &

#sed -i 's/"exited_cleanly":false/"exited_cleanly":true' /home/pi/.config/chromium/Default/Preferences
#sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences


/usr/bin/chromium-browser --noerrordialogs --disable-infobars --kiosk /home/pi/Documents/Pages/video.html --incognito