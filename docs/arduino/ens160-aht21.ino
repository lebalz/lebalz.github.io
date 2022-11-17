#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>
#include <AHTxx.h>
#include "ArduinoJson.h"


/**
* Libraries
* AHTxx: https://github.com/enjoyneering/AHTxx (manual installation: Sketch > Include Library > Add .zip Library)
* DFRobot_ENS160: https://github.com/DFRobot/DFRobot_ENS160
* WIFIManager: https://github.com/tzapu/WiFiManager
* ArduinoJSON: https://arduinojson.org/?utm_source=meta&utm_medium=library.properties
*/

const char* serverName = "https://node-red-nb5t.onrender.com/api/sensor";

#include <Wire.h>
#include "SSD1306Wire.h"
#include "font.h"

#include <DFRobot_ENS160.h>

float ahtValue;
// #define DHTPIN 2 // Wemos D4 is Ardiuno GPIO2

SSD1306Wire display(0x3c, SDA, SCL, GEOMETRY_64_48);

DFRobot_ENS160_I2C ENS160(&Wire, 0x53);

AHTxx aht21(AHTXX_ADDRESS_X38, AHT2x_SENSOR); //sensor address, sensor type

bool configured = true;
int counter = 15;
float humidity = 0;
float temperature = 0;
uint8_t ahtState = 0;



void setup() {
  Serial.begin(115200);
  Serial.println("Begin");

  display.init();
  display.flipScreenVertically();

   // Init the sensor
  while( NO_ERR != ENS160.begin() ){
    Serial.println("Communication with device failed, please check connection");
    delay(3000);
  }
  Serial.println("Begin ok!");

  while (aht21.begin() != true) //for ESP-01 use aht21.begin(0, 2);
  {
    Serial.println(F("AHT2x not connected or fail to load calibration coefficient")); //(F()) save string to flash & keeps dynamic memory free

    delay(5000);
  }

  Serial.println(F("aht21 OK"));

  /**
   * Set power mode
   * mode Configurable power mode:
   *   ENS160_SLEEP_MODE: DEEP SLEEP mode (low power standby)
   *   ENS160_IDLE_MODE: IDLE mode (low-power)
   *   ENS160_STANDARD_MODE: STANDARD Gas Sensing Modes
   */
  ENS160.setPWRMode(ENS160_STANDARD_MODE);

  /**
   * Users write ambient temperature and relative humidity into ENS160 for calibration and compensation of the measured gas data.
   * ambientTemp Compensate the current ambient temperature, float type, unit: C
   * relativeHumidity Compensate the current ambient humidity, float type, unit: %rH
   */
  ENS160.setTempAndHum(/*temperature=*/21.5, /*humidity=*/40.0);

  /* Display connection information on screen */
  drawMAC();

  delay(5000);

  /* Connect to Wifi or start access point to allow configuration */
  WiFiManager wifiManager;
  String ssid = "GBSL " + WiFi.macAddress();
  wifiManager.setAPCallback(configModeCallback);
  wifiManager.setSaveConfigCallback(saveConfigCallback);
  wifiManager.autoConnect((const char*)ssid.c_str());
}

void configModeCallback(WiFiManager *myWiFiManager) {
  configured = false;
}

void saveConfigCallback() {
  configured = true;
}

void drawMAC() {
  display.clear();
  display.setTextAlignment(TEXT_ALIGN_LEFT);
  String ssid1 = "GBSL " + WiFi.macAddress().substring(0, 9);
  String ssid2 = WiFi.macAddress().substring(9);
  display.setFont(ArialMT_Plain_16);
  display.drawStringMaxWidth(0, 0, 64, "Connect");
  display.setFont(Dialog_plain_8);
  display.drawStringMaxWidth(0, 18, 64, (const char*)ssid1.c_str());
  display.drawStringMaxWidth(18, 28, 64, (const char*)ssid2.c_str());
  display.drawStringMaxWidth(0, 40, 64, "192.168.1.4");
  display.display();
}



void drawValues(uint8_t status, uint8_t quality, uint16_t ppm, float t, float h) {
  display.clear();
  display.setTextAlignment(TEXT_ALIGN_LEFT);
  
  display.setFont(ArialMT_Plain_10); display.setTextAlignment(TEXT_ALIGN_LEFT);
  display.drawString(0, 0, "S / Q");
  display.setFont(ArialMT_Plain_10); display.setTextAlignment(TEXT_ALIGN_RIGHT);
  String qt = String(status) + " / " + String(quality);
  display.drawString(64, 0, qt);
  
  display.setFont(ArialMT_Plain_10); display.setTextAlignment(TEXT_ALIGN_LEFT);
  display.drawString(0, 12, "PPM");
  display.setFont(ArialMT_Plain_10); display.setTextAlignment(TEXT_ALIGN_RIGHT);
  display.drawString(64, 12, String(ppm));

  display.setFont(ArialMT_Plain_10); display.setTextAlignment(TEXT_ALIGN_LEFT);
  display.drawString(0, 24, "T°");
  display.setFont(ArialMT_Plain_10); display.setTextAlignment(TEXT_ALIGN_RIGHT);
  display.drawString(64, 24, String(t));

  display.setFont(ArialMT_Plain_10); display.setTextAlignment(TEXT_ALIGN_LEFT);
  display.drawString(0, 36, "F%");
  display.setFont(ArialMT_Plain_10); display.setTextAlignment(TEXT_ALIGN_RIGHT);
  display.drawString(64, 36, String(h));
  display.display();
}

void loop() {
  counter++;

  /**
   * Get the sensor operating status
   * Return value: 0-Normal operation, 
   *         1-Warm-Up phase, first 3 minutes after power-on.
   *         2-Initial Start-Up phase, first full hour of operation after initial power-on. Only once in the sensor’s lifetime.
   * note: Note that the status will only be stored in the non-volatile memory after an initial 24h of continuous
   *       operation. If unpowered before conclusion of said period, the ENS160 will resume "Initial Start-up" mode
   *       after re-powering.
   */
  uint8_t Status = ENS160.getENS160Status();
  // Serial.print("Sensor operating status : ");
  // Serial.println(Status);

  /**
   * Get the air quality index
   * Return value: 1-Excellent, 2-Good, 3-Moderate, 4-Poor, 5-Unhealthy
   */
  uint8_t AQI = ENS160.getAQI();
  // Serial.print("Air quality index : ");
  // Serial.println(AQI);

  /**
   * Get TVOC concentration
   * Return value range: 0–65000, unit: ppb
   */
  uint16_t TVOC = ENS160.getTVOC();
  // Serial.print("Concentration of total volatile organic compounds : ");
  // Serial.print(TVOC);
  // Serial.println(" ppb");

  /**
   * Get CO2 equivalent concentration calculated according to the detected data of VOCs and hydrogen (eCO2 – Equivalent CO2)
   * Return value range: 400–65000, unit: ppm
   * Five levels: Excellent(400 - 600), Good(600 - 800), Moderate(800 - 1000), 
   *               Poor(1000 - 1500), Unhealthy(> 1500)
   */
  uint16_t ECO2 = ENS160.getECO2();
  // Serial.print("Carbon dioxide equivalent concentration : ");
  // Serial.print(ECO2);
  // Serial.println(" ppm");

  // Serial.println();

  // Serial.println();
  if (counter >= 2) {
    counter = 0;
    temperature = aht21.readTemperature(); //read 6-bytes via I2C, takes 80 milliseconds
    if (temperature == AHTXX_ERROR)  { //AHTXX_ERROR = 255, library returns 255 if error occurs
      printStatus(); //print temperature command status
      if (aht21.softReset() == true) {
        ahtState = 0;
        Serial.println(F("reset success")); //as the last chance to make it alive
      } else {                             
        Serial.println(F("reset failed"));
      }
    }
  } else {
    humidity = aht21.readHumidity(); //read another 6-bytes via I2C, takes 80 milliseconds  
    if (humidity == AHTXX_ERROR) { //AHTXX_ERROR = 255, library returns 255 if error occurs
        printStatus(); //print humidity command status
    }
  }

  if(configured) {
    drawValues(Status, AQI, ECO2, temperature, humidity);
  } else {
    drawMAC();
  }


    // Prepare JSON document
  DynamicJsonDocument doc(2048);
  doc["ECO2"] = ECO2;
  doc["AQI"] = AQI;
  doc["TVOC"] = TVOC;
  doc["ENS160"] = Status;
  doc["HUM"] = humidity;
  doc["TEMP"] = temperature;
  doc["AHT21"] = ahtState;

  // Serialize JSON document
  String json;
  serializeJson(doc, json);

  WiFiClientSecure client;
  client.setInsecure();
  client.connect("node-red-nb5t.onrender.com", 443);
  HTTPClient http;
  http.begin(client, serverName);
  http.addHeader("Content-Type", "application/json");
  Serial.println(json);
  int httpResponseCode = http.POST(json);
  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);
  http.end();

  delay(1000);
}

void printStatus()
{
   
  ahtState = aht21.getStatus();
  switch (ahtState)
  {
    case AHTXX_NO_ERROR:
      Serial.println(F("no error"));
      break;

    case AHTXX_BUSY_ERROR:
      Serial.println(F("sensor busy, increase polling time"));
      break;

    case AHTXX_ACK_ERROR:
      Serial.println(F("sensor didn't return ACK, not connected, broken, long wires (reduce speed), bus locked by slave (increase stretch limit)"));
      break;

    case AHTXX_DATA_ERROR:
      Serial.println(F("received data smaller than expected, not connected, broken, long wires (reduce speed), bus locked by slave (increase stretch limit)"));
      break;

    case AHTXX_CRC8_ERROR:
      Serial.println(F("computed CRC8 not match received CRC8, this feature supported only by AHT2x sensors"));
      break;

    default:
      Serial.println(F("unknown status"));    
      break;
  }
}