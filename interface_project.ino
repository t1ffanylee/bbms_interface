const int lightSensor = A0;
int threshold = 0; // Initial threshold, will be calibrated

void setup() {
  pinMode(lightSensor, INPUT);
  Serial.begin(9600);

  // Calibrate the sensor by taking an average reading
  long sum = 0;
  int numReadings = 10; // Number of readings to average

  for (int i = 0; i < numReadings; i++) {
    sum += analogRead(lightSensor);
    delay(100); // Delay between readings
  }

  threshold = sum / numReadings;

  // Print the calibrated threshold value
  Serial.print("Calibrated threshold: ");
  Serial.println(threshold);
}

void loop() {
  int lightValue = analogRead(lightSensor);
  Serial.print("Light value: ");
  Serial.println(lightValue);

  if (lightValue < threshold) {
    // It's dark in the room
    Serial.println("dark");
  } else {
    // It's light in the room
    Serial.println("light");
  }

  delay(1000);
}
