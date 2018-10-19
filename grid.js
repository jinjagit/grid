// grid, by Simon Tharby, 2018

function drawPage() {
  windowH = window.innerHeight;
  lastWindowH = windowH;
  cellHeight = windowH / gridN;
  borderW = windowH / 400;
  menuBoxH = windowH / 20;

  sidebarDiv.style.display = "none";
  waitMsg.style.display = "none";
  body.style.backgroundColor = backgroundColor;
  grid.style.display = "grid";
  grid.style.height = `${windowH}px`;
  grid.style.backgroundColor = backgroundColor;
  grid.style.gridGap = gridGap;

  destroyCells();
  drawCells();

  console.log("page redrawn");
  queueRedraw = true;
}

function drawMenu() {
  lastMenuH = windowH;
  sidebarTrigger.style.width = `${windowH / 100}px`;
  sidebarDiv.style.width = `${menuBoxH * 2.5}px`;
  titleBox.style.height = `${menuBoxH * 2}px`;
  titleBox.style.borderWidth = `${borderW}px ${borderW}px 0 ${borderW}px`;
  gridBtnBox.style.height = `${menuBoxH}px`;
  gridBtnBox.style.borderWidth = `${borderW}px ${borderW}px 0 ${borderW}px`;

  gridBtnText.style.lineHeight = `${menuBoxH}px`;
  gridBtnText.style.fontSize = `${menuBoxH / 2}px`;
  console.log("menu redrawn");
}

function drawCells() {
  for (let i = 0; i < (gridN * gridN); i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = i.toString();

    cell.style.gridColumn = `${(i % gridN) + 1} / span 1`;
    cell.style.lineHeight = `${cellHeight}px`;
    cell.style.backgroundColor = cellColor;

    let clickAtt = document.createAttribute("onclick");
    clickAtt.value = "cellClick(this.id)";
    cell.setAttributeNode(clickAtt);

    grid.appendChild(cell);
  }
}

function destroyCells() {
  let elements = document.getElementsByClassName('cell');
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}

function redrawPage() {
  if (queueRedraw == true) {
    body.style.backgroundColor = "black";
    waitMsg.style.display = "block";
    waitMsg.style.margin = `${menuBoxH * 10}px 0 0 0`;
    waitMsg.style.textAlign = "center";
    grid.style.display = "none";
    delay = setInterval(waitBeforeRedraw, 75); // can be tweaked to speed of PC
    queueRedraw = false;
  }
}

function waitBeforeRedraw() {
  windowH = window.innerHeight;

  if (windowH != lastWindowH) {
    lastWindowH = windowH;
  } else {
    clearInterval(delay);
    drawPage();
  }
}

function cellClick(clickedID) {

}

function triggerHover() {
  sidebarOn = true;
  if (windowH != lastMenuH) {
    drawMenu();
  }
  sidebarDiv.style.display = "inline-block";
}

function triggerUnhover() {
  sidebarDiv.style.display = "none";
  sidebarOn = false;

}

function gridHover() {
  triggerHover();
  gridBtnBox.style.backgroundColor = menuHoverColor;
  gridBtnText.style.color = "black";
}

function gridUnhover() {
  gridBtnBox.style.backgroundColor = cellColor;
  gridBtnText.style.color = backgroundColor;
}

function windowUnHover() {
  if (sidebarOn == true) {
    triggerUnhover();
  }
}

function clickGrid() {
  console.log("clicked");

}

let windowH = 0;
let lastWindowH = 0;
let lastMenuH = 0;

let backgroundColor = "hsl(128, 30%, 40%)";
let menuHoverColor = "hsl(128, 30%, 65%)";
let cellColor = "black";

let gridN = 3;
let cellHeight = 0;
let gridGap = "1px";
let borderW = 0;

let queueRedraw = false;
let sidebarOn = false;

let body = document.getElementsByTagName('body')[0];

body.style.fontFamily = "'Ubuntu Mono', monospace";
body.style.fontWeight = "normal";

waitMsg.style.color = backgroundColor;
waitMsg.style.display = "block";
waitMsg.style.textAlign = "center";

grid.style.display = "grid";
sidebarTrigger.style.position = "absolute";
sidebarTrigger.style.zIndex = "2";
sidebarTrigger.style.height = "100%";
sidebarTrigger.style.backgroundColor = "transparent";
sidebarTrigger.addEventListener('mouseover', triggerHover);

sidebarDiv.style.position = "absolute";
sidebarDiv.style.zIndex = "1";
sidebarDiv.style.height = "100%";
sidebarDiv.style.display = "none";
sidebarDiv.style.backgroundColor = backgroundColor;
sidebarDiv.addEventListener('mouseout', triggerUnhover);
sidebarDiv.addEventListener('mouseover', triggerHover);

titleBox.style.backgroundColor = cellColor;
titleBox.style.borderStyle = "solid";
titleBox.style.borderColor = backgroundColor;
titleBox.addEventListener('mouseover', triggerHover);

gridBtnBox.style.backgroundColor = cellColor;
gridBtnBox.style.borderStyle = "solid";
gridBtnBox.style.borderColor = backgroundColor;
gridBtnBox.addEventListener('mouseover', gridHover);
gridBtnBox.addEventListener('mouseout', gridUnhover);

let clickGridAtt = document.createAttribute("onclick");
clickGridAtt.value = "clickGrid()";
gridBtnBox.setAttributeNode(clickGridAtt);

gridBtnText.style.textAlign = "center";
gridBtnText.style.color = backgroundColor;

body.addEventListener('mouseleave', windowUnHover);

drawPage(); // Also called whenever window (body) is resized
drawMenu();
