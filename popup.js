document.addEventListener('DOMContentLoaded', function () {
    // Function to handle image paste event
    function handleImagePaste(event) {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (let index in items) {
            const item = items[index];
            if (item.kind === 'file') {
                const blob = item.getAsFile();
                const reader = new FileReader();
                reader.onload = function (event) {
                    const img = new Image();
                    img.onload = function () {
                        const imageContainer = document.getElementById('image-container');
                        imageContainer.innerHTML = '';
                        imageContainer.appendChild(img);
                    }
                    img.src = event.target.result;
                }
                reader.readAsDataURL(blob);
            }
        }
    }

    // Function to handle file input change event
    function handleFileInputChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                const imageContainer = document.getElementById('image-container');
                imageContainer.innerHTML = '';
                imageContainer.appendChild(img);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }

    // Function to handle image upload to backend
    // Function to upload image to backend
async function uploadImageToServer(imageData) {
    const formData = new FormData();
    formData.append('file', imageData, 'image.png');
  
    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        responseMessage.textContent = 'Image uploaded successfully!';
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error:', error);
      responseMessage.textContent = 'Error uploading image';
    }
  }
  

    // Function to start recognition process
    function startRecognition() {
        // Show stop button and hide start button
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('stop-button').style.display = 'inline-block';
        document.getElementById('continue-uploading-button').style.display = 'inline-block';
        document.getElementById('upload-button').style.display = 'none';
        // Logic to start recognition process
    }

    // Function to stop recognition process and show download button
    function stopRecognitionAndShowDownloadButton() {
        // Hide stop button and show start button
        document.getElementById('stop-button').style.display = 'none';
        document.getElementById('start-button').style.display = 'inline-block';
        // Show download button
        document.getElementById('download-button').style.display = 'inline-block';
        // Logic to stop recognition process and get recognized text
        
    }
    // Function to stop recognition process and show upload button
function stopRecognitionAndShowUploadButton() {
  // Hide stop button and show start button
  document.getElementById('stop-button').style.display = 'none';
  document.getElementById('start-button').style.display = 'inline-block';
  // Show upload button
  document.getElementById('continue-uploading-button').style.display = 'none'; // Hide continue uploading button
  document.getElementById('upload-button').style.display = 'inline-block'; // Show upload button
  // Logic to stop recognition process
}

    

    // Function to download recognized text as a file
    function downloadTextAsFile(text) {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'recognized_text.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    // Event listeners
    document.addEventListener('paste', handleImagePaste);
    document.getElementById('image-input').addEventListener('change', handleFileInputChange);
    // Event listener for stop button
    document.getElementById('stop-button').addEventListener('click', stopRecognitionAndShowUploadButton);

    // Event listener for upload button
document.getElementById('upload-button').addEventListener('click', async function () {
    const imgElement = document.getElementById('image-container').querySelector('img');
    const responseMessage = document.getElementById('response-message');
    if (imgElement) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;
      ctx.drawImage(imgElement, 0, 0);
  
      // Encode canvas content as data URL
      const imageData = canvas.toDataURL('image/png');
  
      // Upload the image data to backend
      await uploadImageToServer(imageData);
    } else {
      responseMessage.textContent = 'No image found';
    }
  });

  const hiddenTextarea = document.getElementById('hidden-textarea');
  hiddenTextarea.addEventListener('paste', handleImagePaste);
  document.getElementById('image-input').addEventListener('change', handleFileInputChange);
    // Event listener for start button
    document.getElementById('start-button').addEventListener('click', startRecognition);

    // Event listener for stop button
    document.getElementById('stop-button').addEventListener('click', stopRecognitionAndShowDownloadButton);
    document.getElementById('continue-uploading-button').addEventListener('click', function () {
      const imgElement = document.getElementById('image-container').querySelector('img');
      const responseMessage = document.getElementById('response-message');
      if (imgElement) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = imgElement.width;
          canvas.height = imgElement.height;
          ctx.drawImage(imgElement, 0, 0);
          const imageData = canvas.toDataURL('image/png');
          uploadImageToServer(imageData);
      } else {
          responseMessage.textContent = 'No image found';
      }
  });
    // Event listener for download button
    document.getElementById('download-button').addEventListener('click', function () {
        const recognizedText = "Example recognized text"; // Replace with actual recognized text
        downloadTextAsFile(recognizedText);
    });

    // Event listener for continue button
    document.getElementById('continue-button').addEventListener('click', function () {
        document.getElementById('welcome-container').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    });

});
