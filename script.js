function createArray(length) {
  var arr = new Array(length || 0),
    i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }

  return arr;
}
var sizeOfPixel = 30;
var innerWidth = $("#nodes").innerWidth();
var innerHeight = $("#nodes").innerHeight();
var rows = Math.floor(innerHeight / sizeOfPixel),
  columns = Math.floor(innerWidth / sizeOfPixel);
document.getElementById("nodes").style.width = `${sizeOfPixel * columns}px`;
var divArray = createArray(rows + 1, columns);
var divMask = createArray(rows + 1, columns);
for (var i = 0; i < rows; i++) {
  for (var j = 0; j < columns; j++) {
    divArray[i][j] = document.createElement("div");
    divArray[i][j].classList.add("cell");
    divArray[i][j].style.top = `${i * sizeOfPixel}px`;
    divArray[i][j].style.left = `${j * sizeOfPixel}px`;
    divArray[i][j].style.height = `${sizeOfPixel - 4}px`;
    divArray[i][j].style.width = `${sizeOfPixel - 4}px`;
    document.getElementById("nodes").appendChild(divArray[i][j]);
    divMask[i][j] = 0;
  }
}

function constructGrid(sizeOfBlock) {
  sizeOfPixel = sizeOfBlock;
  rows = Math.floor(innerHeight / sizeOfPixel);
  columns = Math.floor(innerWidth / sizeOfPixel);
  divArray = createArray(rows + 1, columns);
  divMask = createArray(rows + 1, columns);
  document.getElementById("nodes").style.width = `${sizeOfPixel * columns}px`;
  document.getElementById("nodes").innerHTML = "";
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      divArray[i][j] = document.createElement("div");
      divArray[i][j].classList.add("cell");
      divArray[i][j].style.top = `${i * sizeOfPixel}px`;
      divArray[i][j].style.left = `${j * sizeOfPixel}px`;
      divArray[i][j].style.height = `${sizeOfPixel - 4}px`;
      divArray[i][j].style.width = `${sizeOfPixel - 4}px`;
      document.getElementById("nodes").appendChild(divArray[i][j]);
      divMask[i][j] = 0;
    }
  }
}
document.getElementById("size-slider").onchange = function (e) {
  var sizeOfBlock = parseInt(document.getElementById("size-slider").value);
  constructGrid(sizeOfBlock);
};
async function treenize(x, y, t, btnRef, sliderRef) {
  if (y >= rows || x >= columns || y < 0 || x < 0) return true;
  if (divMask[y][x] === !t) return true;
  if (x == columns - 1 && y == rows - 1) {
    sliderRef.disabled = false;
    btnRef.disabled = false;
  }
  divArray[y][x].style.backgroundColor = t ? "#71c4c2" : "#4a708b";
  //   divArray[y][x].style.border = t ? "1px solid white" : "1px solid #0000004d";
  divMask[y][x] = !t;
  setTimeout(() => {
    treenize(x, y + 1, t, btnRef, sliderRef);
    treenize(x + 1, y, t, btnRef, sliderRef);
    treenize(x - 1, y, t, btnRef, sliderRef);
    treenize(x, y - 1, t, btnRef, sliderRef);
  }, 100);
  return true;
}

document.getElementById("run-button").onclick = async function (e) {
  // Get the bounding rectangle of target
  this.disabled = true;
  var sliderRef = document.getElementById("size-slider");
  sliderRef.disabled = true;
  const divelement = document.getElementById("nodes");
  treenize(0, 0, divMask[0][0], this, sliderRef);
  // var x = Math.floor((e.pageX - divelement.offsetLeft) / sizeOfPixel),
  //   y = Math.floor((e.pageY - divelement.offsetTop) / sizeOfPixel);
  // console.log($("#nodes").innerWidth(), $("#nodes").innerHeight());
  // $.when(treenize(0, 0)).then(() => {
  //   console.log("completed");
  // });
};
