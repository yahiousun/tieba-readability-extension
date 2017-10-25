export function preload(url) {
  return new Promise((resolve, reject)  => {
    const img = document.createElement('img');
    img.onload = function() {
      resolve(url);
    }
    img.onerror = function(error) {
      reject(error)
    }
    img.src = url;
  });
}
