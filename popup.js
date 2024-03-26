document.addEventListener('DOMContentLoaded', function() {
  // Add event listener for paste event
  document.addEventListener('paste', function(event) {
    var items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (index in items) {
      var item = items[index];
      if (item.kind === 'file') {
        var blob = item.getAsFile();
        var reader = new FileReader();
        reader.onload = function(event) {
          // Display the pasted image inside the image-container
          var img = document.createElement('img');
          img.src = event.target.result;
          document.getElementById('image-container').innerHTML = '';
          document.getElementById('image-container').appendChild(img);
        };
        reader.readAsDataURL(blob);
      }
    }
  });

  // Add event listener for click event on upload button
  document.getElementById("upload-button").addEventListener("click", function() {
    // Trigger click event on hidden file input
    document.getElementById("image-input").click();
  });

  // Add event listener for change event on file input
  document.getElementById("image-input").addEventListener("change", function() {
    var file = this.files[0];
    if (file) {
      var formData = new FormData();
      formData.append("image", file);

      fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Handle response from backend
        console.log(data);
        document.getElementById("response-message").innerText = "Image uploaded successfully.";
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("response-message").innerText = "Error uploading image.";
      });
    }
  });
});
