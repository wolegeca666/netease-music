export function afterMounted() {
  let img = document.getElementsByTagName('img');
      img.forEach(function (item) {
    item.onmousedown = function(e){
      e.preventDefault()
    };
  });
  return img
}