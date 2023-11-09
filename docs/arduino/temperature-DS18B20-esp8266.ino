#include <OneWire.h>
#include <DallasTemperature.h>
// #include <WiFiManager.h>
#include "SSD1306Wire.h"

// Data wire is plugged into digital gpio 0 (D3 on WEMOS D1)
#define ONE_WIRE_BUS 0

SSD1306Wire display(0x3c, SDA, SCL, GEOMETRY_64_48);

/**
* Setup a oneWire instance to communicate with any OneWire device
* rot -> 5v
* gelb -> gnd
* grün -> vcc (GPIO PIN)
*/
OneWire oneWire(ONE_WIRE_BUS);  

// Pass oneWire reference to DallasTemperature library
DallasTemperature sensors(&oneWire);

bool is_top = true;
void setup(void)
{
  Serial.begin(9600);
  Serial.println("Start");
  display.init();
  display.flipScreenVertically();
  display.clear();
  sensors.begin();  // Start up the library
  String start = "Starting...";
  display.drawStringMaxWidth(2, 5, 64, (const char*)start.c_str());;
  display.display();
  delay(1000);
}

void loop(void)
{ 
  // Send the command to get temperatures
  sensors.requestTemperatures();
  is_top = !is_top;

  //print the temperature in Celsius
  // Serial.print(millis()/1000.0);
  // Serial.print(",");
  float temp = sensors.getTempCByIndex(0);
  Serial.println(temp);
  String title = "Temperatur:";
  String tempstr = String(temp, 2) + "° C";
  String process = is_top ? "_ " : " _";
  display.clear();
  display.drawStringMaxWidth(2, 5, 64, (const char*)title.c_str());
  display.drawStringMaxWidth(2, 22, 64, (const char*)tempstr.c_str());
  display.drawStringMaxWidth(2, 32, 64, (const char*)process.c_str());
  display.display();
  
  delay(500);
}
