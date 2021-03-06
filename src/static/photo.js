$(function() {
  if($("#canvas").size() == 0) return;
  // Put event listeners into place
  // Grab elements, create settings, etc.
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var video = document.getElementById("video");
  var videoObj = { "video": true };
  var errBack = function(error) {
    console.log("Video capture error: ", error.code);
  };

  // Put video listeners into place
  if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia(videoObj, function(stream) {
      video.src = stream;
      video.play();
    }, errBack);
  } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia(videoObj, function(stream){
      video.src = window.webkitURL.createObjectURL(stream);
      video.play();
    }, errBack);
  }
  // Trigger photo take
  document.getElementById("snap").addEventListener("click", function() {
    context.drawImage(video, 0, 0, 640, 480);
    var data = new FormData();
    data.append('img', canvas.toDataURL('image/jpg'), 'asdf.jpg');
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "/receive_photo/");
    oReq.send(data);
    $("#record-feedback").hide();
    $("#record-feedback").show('slow');
  });
});
