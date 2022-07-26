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