let video;
let pose;
let skeleton;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  let poseNet = ml5.poseNet(video, () => console.log('PoseNet ready'));
  poseNet.on('pose', (results) => {
    if (results.length > 0) {
      pose = results[0].pose;
      skeleton = results[0].skeleton;
    }
  });
}

function draw() {
  background(220);
  translate(video.width, 0); // 因為攝影機顯示的是反像的畫面，需要透過這兩條指令來做反轉
  scale(-1, 1);             // 因為攝影機顯示的是反像的畫面，需要透過這兩條指令來做反轉
  image(video, 0, 0, 640, 480);

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
