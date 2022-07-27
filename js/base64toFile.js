base64ToFile(base, filename = ''){
  let arr = base.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split('/')[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {
    type: mime
  });
}

fileTobase64(file){
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (reader) {
      resolve(reader.currentTarget.result);
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
}

