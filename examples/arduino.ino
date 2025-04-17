#include <stdio.h>

#define STATION_NAME "Station5"
#define STATION_RESOURCES_SIZE 2
#define STATION_MAC_ADDRESS 0x74,0x69,0x69,0x2D,0x30,0x34
#define AREA(s) (s * s) // macro with argument

class Resource {
  public:
    const char* name;

    Resource(const char* resource_name) {
      name = resource_name;
    }

  public:
    virtual void setup() {
    }
}

class SwitchResource: public Resource {
  private:
    // int (*fn)(bool, int);
    uint8_t pin;

  public:
    // int (*f)(bool, int),
    SwitchResource(const char* switch_name, uint8_t switch_pin): Resource { switch_name } {
      pin = switch_pin;
    };

    void setup() {
      #ifdef DEBUG
        Serial.print(F("Setup "));
        Serial.print(SWITCH_RESOURCE_COMPONENT);
        Serial.print(F(": "));
        Serial.println(name);
      #endif

      // initialize digital pin mosfet as an output
      pinMode(pin, OUTPUT);
      digitalWrite(pin, SWITCH_INITIAL_VALUE ? HIGH : LOW);
    }
};


void setup() {
  #ifdef DEBUG
    initSerial();
  #endif
  initEthernet();

  /* init station */
  Resource *resources[STATION_RESOURCES_SIZE] = {
    new SwitchResource("relay1", RELAY_PIN_1),
    new SwitchResource("relay2", RELAY_PIN_2)
 };
  registerResources(resources);
}

void loop() {
  stationLoop();
}
