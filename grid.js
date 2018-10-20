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
  if (settingsOn == true) {
    drawSettings();
  }

  queueRedraw = true;
}

function drawSidebar() {
  lastSidebarH = windowH;
  sidebarTrigger.style.width = `${windowH / 100}px`;
  sidebarDiv.style.width = `${menuBoxH * 2.5}px`;
  titleBox.style.height = `${menuBoxH * 2}px`;
  titleBox.style.borderWidth = `${borderW}px ${borderW}px 0 ${borderW}px`;
  gridBtnBox.style.height = `${menuBoxH}px`;
  gridBtnBox.style.borderWidth = `${borderW}px ${borderW}px 0 ${borderW}px`;

  gridBtnText.style.lineHeight = `${menuBoxH}px`;
  gridBtnText.style.fontSize = `${menuBoxH / 2}px`;
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
    body.style.backgroundColor = cellColor;
    if (settingsOn == true) {
      settingsBox.style.display = "none";
    }
    waitMsg.style.display = "block";
    waitMsg.style.margin = `${windowH / 2}px 0 0 0`;
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

function drawSettings() {
  settingsOn = true;
  let f = 0.7; // size factor
  let sideMargin = (window.innerWidth - (windowH * f / 2)) / 2;
  let btnBorder = windowH * f / 200;

  settingsBox.style.display = "block";
  settingsBox.style.width = `${windowH * f / 2}px`;
  settingsBox.style.margin = `${windowH * f / 4}px ${sideMargin}px ${windowH * f / 4}px ${sideMargin}px`;
  setRow8.style.width = "100%";
  setRow8.style.height = `${windowH * f / 16}px`;
  closeBtnBox.style.height = `${(windowH * f / 16) - (2 * btnBorder)}px`;
  closeBtnBox.style.width = `${windowH * f / 6}px`;
  closeBtnBox.style.display = "inline-block";
  closeBtnBox.style.margin = `0 0 0 ${windowH * f / 6}px`;
  closeBtnBox.style.backgroundColor = cellColor;
  closeBtnBox.style.borderStyle = "solid";
  closeBtnBox.style.borderColor = backgroundColor;
  closeBtnBox.style.borderWidth = `${btnBorder}px`;
  closeBtnText.style.lineHeight = `${(windowH * f / 16) - (2 * btnBorder)}px`;
  closeBtnText.style.fontSize = `${(windowH * f / 24) - (2 * btnBorder)}px`;
  closeBtnText.style.textAlign = "center";
  setRow1.style.width = "100%";
  setRow1.style.height = `${windowH * f / 24}px`;
  document.getElementById('setRow1').appendChild(text1);
  text1.style.display = "inline-block";
  text1.style.lineHeight = `${(windowH * f / 24)}px`;
  text1.style.fontSize = `${(windowH * f / 36)}px`;
  text1.style.textAlign = "left";
  text1.style.color = cellColor;
  text1.style.margin = `0 0 0 ${windowH * f / 64}px`;
  text1.innerHTML = "number of rows (0 > n < 65):";
  form1.appendChild(input1);
  form1.style.display = "inline-block";
  form1.style.height = `${(windowH * f / 36)}px`;
  form1.style.margin = `0 0 0 ${windowH * f / 96}px`;
  input1.style.width = `${windowH * f / 30}px`;
  input1.style.lineHeight = `${(windowH * f / 36)}px`;
  input1.style.fontSize = `${(windowH * f / 36)}px`;
  input1.style.backgroundColor = cellColor;
  input1.style.color = backgroundColor;
  input1.style.border = "none";
  input1.style.textAlign = "center";
  input1.value = `${gridN}`;
  document.getElementById('setRow1').appendChild(form1);
}

function cellClick(clickedID) {
  // to develop: for use in editing module(s) placement(s) & settings
}

function triggerHover() {
  sidebarOn = true;
  if (windowH != lastSidebarH) {
    drawSidebar();
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
  gridBtnText.style.color = cellColor;
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

function clickGridBtn() {
  drawSettings();
}

function clickCloseBtn() {
  settingsBox.style.display = "none";
  gridN = input1.value;
  settingsOn = false;
  redrawPage();
}

function closeHover() {
  closeBtnBox.style.backgroundColor = menuHoverColor;
  closeBtnText.style.color = cellColor;
}

function closeUnhover() {
  closeBtnBox.style.backgroundColor = cellColor;
  closeBtnText.style.color = backgroundColor;
}

let windowH = 0;
let lastWindowH = 0;
let lastSidebarH = 0;

let backgroundColor = "hsl(128, 30%, 40%)";
let menuHoverColor = "hsl(128, 30%, 65%)";
let cellColor = "black";

let gridN = 3;
let cellHeight = 0;
let gridGap = "1px";
let borderW = 0;

let queueRedraw = false;
let sidebarOn = false;
let settingsOn = false;

let text1 = document.createElement('p');
let form1 = document.createElement('form');
form1.setAttribute("method", "GET");
form1.setAttribute("action", "#");
form1.setAttribute("target", "_self");
let input1 = document.createElement("input");
input1.setAttribute("name", "");
input1.setAttribute("value", "");

let body = document.getElementsByTagName('body')[0];

body.style.fontFamily = "'Ubuntu Mono', monospace";
body.style.fontWeight = "normal";
body.addEventListener('mouseleave', windowUnHover);

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

let clickGridBtnAtt = document.createAttribute("onclick");
clickGridBtnAtt.value = "clickGridBtn()";
gridBtnBox.setAttributeNode(clickGridBtnAtt);

gridBtnText.style.textAlign = "center";
gridBtnText.style.color = backgroundColor;

settingsBox.style.display = "none";
settingsBox.style.position = "absolute";
settingsBox.style.zIndex = "3";
settingsBox.style.backgroundColor = backgroundColor;

closeBtnText.style.color = backgroundColor;
closeBtnBox.addEventListener('mouseover', closeHover);
closeBtnBox.addEventListener('mouseout', closeUnhover);
let clickCloseBtnAtt = document.createAttribute("onclick");
clickCloseBtnAtt.value = "clickCloseBtn()";
closeBtnBox.setAttributeNode(clickCloseBtnAtt);

drawPage(); // Also called whenever window (body) is resized, via redrawPage()
drawSidebar();
