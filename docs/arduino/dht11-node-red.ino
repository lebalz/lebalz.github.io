
#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"

DHT dht(26, DHT11);

// Replace with your network credentials (STATION)
const char* ssid = "SSID";
const char* password = "PASSWORD";

//Your Domain name with URL path or IP address with path
const char* serverName = "https://red.server.ch/iot/endpoint";

void initWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
}

void setup() {
  Serial.begin(9600);
  initWiFi();
  Serial.print("RRSI: ");
  Serial.println(WiFi.RSSI());
   dht.begin();

}

void loop() {
  delay(1000);
  float h = dht.readHumidity();
   float t = dht.readTemperature();

   Serial.print("Humidity: ");
   Serial.println(h);
   Serial.print("Temperature: ");
   Serial.println(t);

    String rssi = String(WiFi.RSSI());

    if(WiFi.status()== WL_CONNECTED){
      WiFiClientSecure client;

      client.setInsecure();
      client.connect("red.gbsl.website", 443);

      HTTPClient http;
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName);

      // Specify content-type header
      http.addHeader("Content-Type", "application/json");
      // Send HTTP POST request
      int httpResponseCode = http.POST("{\"mac_address\":\"" + WiFi.macAddress() + "\",\"rssi\":" + rssi + ",\"humidity\":" + h + ",\"temperature\":" + t + "}");
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
        
        // Free resources
        http.end();
      }
    else {
      Serial.println("WiFi Disconnected");
    }
}