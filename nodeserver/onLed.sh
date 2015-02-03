#! /bin/bash

echo "214" > /sys/class/gpio/export

# Initializing digital output pin number 7
echo "255" > /sys/class/gpio/export
echo "223" > /sys/class/gpio/export
echo "48" > /sys/class/gpio/export
echo "in" > /sys/class/gpio/gpio233/direction
echo "out" > /sys/class/gpio/gpio255/direction
echo "out" > /sys/class/gpio/gpio48/direction
echo "1" > /sys/class/gpio/gpio255/value
echo "0" > /sys/class/gpio/gpio48/value

echo "high" > /sys/class/gpio/gpio214/direction  

echo -n "1" > /sys/class/gpio/gpio48/value 



