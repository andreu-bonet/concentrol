#define PUMP_1_POWER 8
#define PUMP_1_FLOW 3
#define PUMP_1_SEC 4

#define PUMP_2_POWER 12
#define PUMP_2_FLOW 5
#define PUMP_2_SEC 7

#define VALVE_POWER 2
#define LED_POWER 13

void setup()
{
	Serial.begin(9600);

	pinMode(PUMP_1_POWER, OUTPUT);
	digitalWrite(PUMP_1_POWER, HIGH);

	pinMode(PUMP_1_FLOW, OUTPUT);
	analogWrite(PUMP_1_FLOW, 51);

	pinMode(PUMP_1_SEC, OUTPUT);
	digitalWrite(PUMP_1_SEC, HIGH);

	pinMode(PUMP_2_POWER, OUTPUT);
	digitalWrite(PUMP_2_POWER, HIGH);

	pinMode(PUMP_2_FLOW, OUTPUT);
	analogWrite(PUMP_2_FLOW, 51);

	pinMode(PUMP_2_SEC, OUTPUT);
	digitalWrite(PUMP_2_SEC, HIGH);

	pinMode(VALVE_POWER, OUTPUT);
	digitalWrite(VALVE_POWER, LOW);

	pinMode(LED_POWER, OUTPUT);
	digitalWrite(LED_POWER, LOW);
}

void loop()
{
	if (Serial.available() > 0)
	{
		String command = Serial.readStringUntil('\n');

		if (command == "pump_1_active:true")
		{
			digitalWrite(PUMP_1_POWER, LOW);
		}
		else if (command == "pump_1_active:false")
		{
			digitalWrite(PUMP_1_POWER, HIGH);
		}
		else if (command.startsWith("pump_1_flow:"))
		{
			int index = command.indexOf(':');
			int length = command.length();
			int value = command.substring(index + 1, length).toInt();
			analogWrite(PUMP_1_FLOW, value);
		}
		else if (command == "pump_1_active:true")
		{
			digitalWrite(PUMP_2_POWER, LOW);
		}
		else if (command == "pump_1_active:false")
		{
			digitalWrite(PUMP_2_POWER, HIGH);
		}
		else if (command.startsWith("pump_2_flow:"))
		{
			int index = command.indexOf(':');
			int length = command.length();
			int value = command.substring(index + 1, length).toInt();
			analogWrite(PUMP_2_FLOW, value);
		}
		else if (command == "valve_active:true")
		{
			digitalWrite(VALVE_POWER, HIGH);
		}
		else if (command == "valve_active:false")
		{
			digitalWrite(VALVE_POWER, LOW);
		}
		else if (command == "led_active:true")
		{
			digitalWrite(LED_POWER, HIGH);
		}
		else if (command == "led_active:false")
		{
			digitalWrite(LED_POWER, LOW);
		}
	}

	delay(1);
}
