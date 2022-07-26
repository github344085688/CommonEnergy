(function () {
  function CurrentCamerat(options) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 480;
    this.context = this.canvas.getContext('2d');
    this.video = document.getElementById('video');
  }

  CurrentCamerat.prototype = {
    init(){
      function getUserMedia(constraints, success, error) {
        if (navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
        } else if (navigator.webkitGetUserMedia) {
          navigator.webkitGetUserMedia(constraints, success, error)
        } else if (navigator.mozGetUserMedia) {
          navigator.mozGetUserMedia(constraints, success, error);
        } else if (navigator.getUserMedia) {
          navigator.getUserMedia(constraints, success, error);
        }
      }

      function success(stream) {
        this.video.srcObject = stream;
        this.video.play();
      }

      function error(error) {
      }

      if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          return;
        }
        var exArray = [];
        navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
          devices.forEach(function (device) {
            if (device.kind == "videoinput") {
              exArray.push(device.deviceId);
            }
          });
          var mediaOpts = {video: {width: 640, height: 480}};
          var mediaOpts =
            {
              video: {
                deviceId: {exact: exArray[1]}
              }
            };
          getUserMedia(mediaOpts, success, error);
        })
        .catch(function (err) {

        });

      } else {

      }
    },
    drawImage(){
      this.context.drawImage(this.video, 0, 0, 640, 480);
      var image = new Image();
      image.src = this.canvas.toDataURL("image/jpeg");
      return {
        base64:image.src,
        ImageData: this.context.getImageData(0, 0, 640, 480),
        file: this.base64toFile(image.src),
      }
    },

    base64toFile (dataurl, filename = '') {
    var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var suffix = mime.split('/')[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], `${filename}.${suffix}`, {
      type: mime
    });
  }
  };
  window.CurrentCamerat = CurrentCamerat;

})();