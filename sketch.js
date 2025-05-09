let video;
let poseNet;
let pose;
let skeleton;
let hands;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded); // 呼叫PoseNet函數
  poseNet.on('pose', gotPoses);

  let handpose = ml5.handpose(video, () => console.log('Handpose ready'));
  handpose.on('hand', (results) => {
    hands = results;
  });
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose; // 把抓到的幾個點放置到pose變數內
    skeleton = poses[0].skeleton; // 把骨架的點放到skeleton變數內
  }
}

function modelLoaded() { // 顯示PoseNet模型已準備就緒
  console.log('poseNet ready');
}

function draw() {
  background(0);
  let videoWidth = windowWidth * 0.8; // 設定影像寬度為視窗寬度的80%
  let videoHeight = windowHeight * 0.8; // 設定影像高度為視窗高度的80%
  let xOffset = (windowWidth - videoWidth) / 2; // 計算影像水平置中的偏移量
  let yOffset = (windowHeight - videoHeight) / 2; // 計算影像垂直置中的偏移量

  translate(videoWidth, 0); // 因為攝影機顯示的是反像的畫面，需要透過這兩條指令來做反轉
  scale(-1, 1);             // 因為攝影機顯示的是反像的畫面，需要透過這兩條指令來做反轉
  image(video, xOffset, yOffset, videoWidth, videoHeight); // 顯示影像在視窗中間，大小為視窗的80%

  if (pose) {
    let eyeR = pose.rightEye;  // 抓到右眼資訊，放到eyeR
    let eyeL = pose.leftEye;   // 抓到左眼資訊，放到eyeL
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y); // 算出左右眼的距離，當作鼻子顯示圓的直徑
    fill(255, 0, 0);
    ellipse(pose.nose.x, pose.nose.y, d); // 畫出鼻子的圓
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 62); // 畫出右手腕圓圈
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 62); // 畫出左手腕圓圈
    drawKeypoints();
    drawSkeleton();
  }

  if (hands) {
    for (let hand of hands) {
      for (let i = 0; i <= 4; i++) { // 串接keypoints編號0到4
        let x = hand.landmarks[i][0];
        let y = hand.landmarks[i][1];
        fill(255, 0, 0);
        ellipse(x, y, 10, 10);
        fill(255);
        textSize(12);
        text(i, x + 5, y - 5); // 標記keypoint編號

        if (i > 0) { // 串接keypoints
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
        text(i, x + 5, y - 5);

        if (i > 5) {
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
        text(i, x + 5, y - 5);

        if (i > 9) {
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
        text(i, x + 5, y - 5);

        if (i > 13) {
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
        text(i, x + 5, y - 5);

        if (i > 17) {
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

function drawKeypoints() {  
  for (let i = 0; i < pose.keypoints.length; i++) {
    let x = pose.keypoints[i].position.x; // 找出每一個點的x座標
    let y = pose.keypoints[i].position.y; // 找出每一個點的y座標
    fill(0, 255, 0);
    ellipse(x, y, 16, 16);
  }
}

function drawSkeleton() {
  for (let i = 0; i < skeleton.length; i++) {
    let a = skeleton[i][0];
    let b = skeleton[i][1];
    strokeWeight(2);
    stroke(255);
    line(a.position.x, a.position.y, b.position.x, b.position.y);
  }
}
