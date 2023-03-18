#include <TinyGPS++.h>
#include <SoftwareSerial.h>

static const int RXPin = 4, TXPin = 3;
// make sure the baud rate is the same as the one in the GPS module
static const uint32_t GPSBaud = 9600;

// The TinyGPS++ object
TinyGPSPlus gps;

// The serial connection to the GPS device
SoftwareSerial ss(RXPin, TXPin);

void setup(){
  Serial.begin(9600);
  Serial.println("Start...");
  ss.begin(GPSBaud);
}

void loop(){
  while (ss.available() > 0){
    gps.encode(ss.read());
    if (gps.location.isUpdated()){
      Serial.print("Lat= "); 
      Serial.print(gps.location.lat(), 6);
      Serial.print(" Long= "); 
      Serial.println(gps.location.lng(), 6);
    }
  }
}