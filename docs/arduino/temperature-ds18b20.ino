#include <OneWire.h>
#include <DallasTemperature.h>

// Data wire is plugged into digital pin 2 on the Arduino
#define ONE_WIRE_BUS 2
//rot -> 5v
// gelb->gnd
//grün->vcc
// Setup a oneWire instance to communicate with any OneWire device
OneWire oneWire(ONE_WIRE_BUS);  

// Pass oneWire reference to DallasTemperature library
DallasTemperature sensors(&oneWire);

void setup(void)
{
  sensors.begin();  // Start up the library
  Serial.begin(9600);
}

void loop(void)
{ 
  // Send the command to get temperatures
  sensors.requestTemperatures(); 

  //print the temperature in Celsius
  //Serial.print(millis()/1000.0);
  //Serial.print(",");
  Serial.println(sensors.getTempCByIndex(0));
  
  //print the temperature in Fahrenheit
  //Serial.print((sensors.getTempCByIndex(0) * 9.0) / 5.0 + 32.0);
  //Serial.println("° F");
  
  delay(1000);
}
