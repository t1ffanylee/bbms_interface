let port;
let serial;
let serialOptions = { baudRate: 9600 }; // Match the baud rate with Arduino
let lightMode = true; // Initially, it's in light mode

function setup() {
  createCanvas(400, 400);
  
  // Setup Web Serial using serial.js
  serial = new Serial();
  serial.on(SerialEvents.CONNECTION_OPENED, onSerialConnectionOpened);
  serial.on(SerialEvents.CONNECTION_CLOSED, onSerialConnectionClosed);
  serial.on(SerialEvents.DATA_RECEIVED, onSerialDataReceived);
  serial.on(SerialEvents.ERROR_OCCURRED, onSerialErrorOccurred);

  // Request a serial connection
  serial.autoConnectAndOpenPreviouslyApprovedPort(serialOptions);

  // Add a message element to display the light/dark status
  pHtmlMsg = createP("Light status: ");
}

function draw() {
  if (lightMode) {
    // Light mode
    colorMode(RGB);
    stroke(255);
    background(51);
    const from = color("orange");
    const to = color("yellow");
    colorMode(RGB);
    const interA = lerpColor(from, to, 0.33);
    const interB = lerpColor(from, to, 0.66);
    fill(from);
    rect(0, 0, 400, 100);
    fill(interA);
    rect(0, 100, 400, 200);
    fill(interB);
    rect(0, 200, 400, 300);
    fill(to);
    rect(0, 300, 400, 400);
    pHtmlMsg.elt.innerText = "Light status: Light";
  } else {
    // Dark mode
    const from = color("blue");
    const to = color("indigo");
    colorMode(RGB);
    const interA = lerpColor(from, to, 0.33);
    const interB = lerpColor(from, to, 0.66);
    fill(from);
    rect(0, 0, 400, 100);
    fill(interA);
    rect(0, 100, 400, 200);
    fill(interB);
    rect(0, 200, 400, 300);
    fill(to);
    rect(0, 300, 400, 400);
    pHtmlMsg.elt.innerText = "Light status: Dark";
  }
}

function onSerialErrorOccurred(eventSender, error) {
  console.log("onSerialErrorOccurred", error);
}

function onSerialConnectionOpened(eventSender) {
  console.log("onSerialConnectionOpened");
}

function onSerialConnectionClosed(eventSender) {
  console.log("onSerialConnectionClosed");
}

function onSerialDataReceived(eventSender, newData) {
  console.log("onSerialDataReceived", newData);
  if (newData === "light") {
    lightMode = true; // Switch to light mode
  } else if (newData === "dark") {
    lightMode = false; // Switch to dark mode
  }
}
