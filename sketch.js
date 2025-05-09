let video;

function setup() {
  createCanvas(windowWidth, windowHeight); // 建立全螢幕的畫布
  video = createCapture(VIDEO);
  video.hide(); // 隱藏預設的攝影機畫面
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
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
}
