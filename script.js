
let video = document.getElementById("camera");
let result = document.getElementById("result");
let model;

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}

async function loadModel() {
  model = await mobilenet.load();
  result.textContent = "جاهز للتحليل ✅";
}

async function analyze() {
  if (!model) {
    result.textContent = "جاري تحميل النموذج...";
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  const predictions = await model.classify(canvas);

  if (predictions.length > 0) {
    result.textContent = `📍 أقرب وصف: ${predictions[0].className} (نسبة: ${Math.round(predictions[0].probability * 100)}%)`;
  } else {
    result.textContent = "ما قدرت أتعرف على المكان 😔";
  }
}

setupCamera();
loadModel();
