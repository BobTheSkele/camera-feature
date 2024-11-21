// Get the video element and canvas
const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const capturedImage = document.getElementById('captured-image');
const captureButton = document.getElementById('capture-button');

// Access the webcam
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function(error) {
    console.log('Error accessing webcam: ', error);
  });

// Capture the photo
captureButton.addEventListener('click', function() {
  const context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/png');
  capturedImage.src = dataUrl;
  capturedImage.style.display = 'block';  // Show the captured image
});
