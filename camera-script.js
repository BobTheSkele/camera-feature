const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const capturedImage = document.getElementById('captured-image');

// Load face-api.js models
Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models')
]).then(startWebcam);

function startWebcam() {
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch(err => console.error("Error accessing webcam:", err));
}

video.onplay = () => {
  const canvasContext = canvas.getContext('2d');
  setInterval(async () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    const detections = await faceapi.detectAllFaces(video)
      .withFaceLandmarks()
      .withFaceDescriptors();

    faceapi.matchDimensions(canvas, video);
    const resizedDetections = faceapi.resizeResults(detections, video);
    canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);

    resizedDetections.forEach(detection => {
      const { width, height, top, left } = detection.detection.box;
      const faceX = left + width / 2 - 50;  // Adjust to center the overlay
      const faceY = top + height / 2 - 50;  // Adjust to center the overlay

      capturedImage.style.display = 'block';
      capturedImage.style.left = `${faceX}px`;
      capturedImage.style.top = `${faceY}px`;
    });
  }, 100);
}
