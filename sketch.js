let video;
let hands;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  let handpose = ml5.handpose(video, () => console.log('Handpose ready'));
  handpose.on('hand', (results) => {
    hands = results;
  });
}

function draw() {
  background(220);
  translate(video.width, 0); // 因為攝影機顯示的是反像的畫面，需要透過這兩條指令來做反轉
  scale(-1, 1);             // 因為攝影機顯示的是反像的畫面，需要透過這兩條指令來做反轉
  image(video, 0, 0, 640, 480);

  if (hands) {
    for (let hand of hands) {
      for (let i = 0; i <= 4; i++) { // 只處理keypoints編號0到4
        let x = hand.landmarks[i][0];
        let y = hand.landmarks[i][1];
        fill(255, 0, 0);
        ellipse(x, y, 10, 10);
        fill(255);
        textSize(12);
        text(i, x + 5, y - 5); // 標記keypoint編號

        if (i > 0) { // 串接keypoints 0到4
          let prevX = hand.landmarks[i - 1][0];
          let prevY = hand.landmarks[i - 1][1];
          stroke(0, 255, 0);
          strokeWeight(2);
          line(prevX, prevY, x, y);
        }
      }

      for (let i = 5; i <= 8; i++) { // 串接keypoints編號5到8
        let x = hand.landmarks[i][0];
        let y = hand.landmarks[i][1];
        fill(0, 0, 255);
        ellipse(x, y, 10, 10);
        fill(255);
        textSize(12);
        text(i, x + 5, y - 5); // 標記keypoint編號

        if (i > 5) { // 串接keypoints
          let prevX = hand.landmarks[i - 1][0];
          let prevY = hand.landmarks[i - 1][1];
          stroke(255, 0, 0);
          strokeWeight(2);
          line(prevX, prevY, x, y);
        }
      }

      for (let i = 9; i <= 12; i++) { // 串接keypoints編號9到12
        let x = hand.landmarks[i][0];
        let y = hand.landmarks[i][1];
        fill(0, 255, 255);
        ellipse(x, y, 10, 10);
        fill(255);
        textSize(12);
        text(i, x + 5, y - 5); // 標記keypoint編號

        if (i > 9) { // 串接keypoints
          let prevX = hand.landmarks[i - 1][0];
          let prevY = hand.landmarks[i - 1][1];
          stroke(255, 255, 0);
          strokeWeight(2);
          line(prevX, prevY, x, y);
        }
      }

      for (let i = 13; i <= 16; i++) { // 串接keypoints編號13到16
        let x = hand.landmarks[i][0];
        let y = hand.landmarks[i][1];
        fill(255, 165, 0);
        ellipse(x, y, 10, 10);
        fill(255);
        textSize(12);
        text(i, x + 5, y - 5); // 標記keypoint編號

        if (i > 13) { // 串接keypoints
          let prevX = hand.landmarks[i - 1][0];
          let prevY = hand.landmarks[i - 1][1];
          stroke(128, 0, 128);
          strokeWeight(2);
          line(prevX, prevY, x, y);
        }
      }

      for (let i = 17; i <= 20; i++) { // 串接keypoints編號17到20
        let x = hand.landmarks[i][0];
        let y = hand.landmarks[i][1];
        fill(128, 128, 0);
        ellipse(x, y, 10, 10);
        fill(255);
        textSize(12);
        text(i, x + 5, y - 5); // 標記keypoint編號

        if (i > 17) { // 串接keypoints
          let prevX = hand.landmarks[i - 1][0];
          let prevY = hand.landmarks[i - 1][1];
          stroke(0, 128, 128);
          strokeWeight(2);
          line(prevX, prevY, x, y);
        }
      }
    }
  }
}
