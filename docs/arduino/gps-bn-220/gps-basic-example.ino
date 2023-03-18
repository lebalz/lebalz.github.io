#include <SoftwareSerial.h>


static const int RXPin = 4, TXPin = 3;
static const uint32_t GPSBaud = 9600;


// The serial connection to the GPS device
SoftwareSerial ss(RXPin, TXPin);

void setup() {  
  Serial.begin(9600);
  ss.begin(GPSBaud);
  Serial.println("Starting GPS...");
}

void loop() {
  while (ss.available() > 0) {
    byte gpsData = ss.read();
    // only display the NMEA data packets
    // see http://aprs.gids.nl/nmea/ for details about the format
    Serial.write(gpsData);
  }
}
