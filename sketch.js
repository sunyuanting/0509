let video;
let handpose;
let predictions = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", gotHands);
}

function modelReady() {
  console.log("Handpose model ready!");
}

function gotHands(results) {
  predictions = results;
}

function draw() {
  background(0);
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);

  drawHands();
}

function drawHands() {
  for (let i = 0; i < predictions.length; i++) {
    const landmarks = predictions[i].landmarks;

    // 畫每根手指的線段（從掌心到指尖）
    const fingers = {
      thumb: [0, 1, 2, 3, 4],
      index: [0, 5, 6, 7, 8],
      middle: [0, 9, 10, 11, 12],
      ring: [0, 13, 14, 15, 16],
      pinky: [0, 17, 18, 19, 20]
    };

    stroke(0, 255, 0);
    strokeWeight(2);

    for (let finger in fingers) {
      let points = fingers[finger].map(i => landmarks[i]);
      for (let j = 0; j < points.length - 1; j++) {
        let [x1, y1] = points[j];
        let [x2, y2] = points[j + 1];
        line(x1, y1, x2, y2);
      }
    }

    // 畫每個點
    fill(255, 0, 0);
    noStroke();
    for (let j = 0; j < landmarks.length; j++) {
      let [x, y] = landmarks[j];
      ellipse(x, y, 8, 8);
    }
  }
}
