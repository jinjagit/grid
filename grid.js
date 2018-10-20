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
  let dim = windowH * 0.7; // size factor
  let sideMargin = (window.innerWidth - (dim / 2)) / 2;
  let btnBorder = dim / 200;

  // ......... for all settings menus ...............................
  settingsBox.style.display = "block";
  settingsBox.style.width = `${dim / 2}px`;
  settingsBox.style.margin = `${dim / 4}px ${sideMargin}px ${dim / 4}px ${sideMargin}px`;

  setRow1.style.width = "100%";
  setRow1.style.height =

  settingsTitle.innerHTML = "grid settings"
  settingsTitle.style.textAlign = "center";
  settingsTitle.style.lineHeight = `${dim / 16}px`;
  settingsTitle.style.color = cellColor;
  settingsTitle.style.fontSize = `${(dim / 24) - (2 * btnBorder)}px`;

  setRow7.style.width = "100%";
  setRow7.style.height = `${dim / 16}px`;

  setRow8.style.width = "100%";
  setRow8.style.height = `${dim / 16}px`;

  closeBtnBox.style.height = `${(dim / 16) - (2 * btnBorder)}px`;
  closeBtnBox.style.width = `${dim / 6}px`;
  closeBtnBox.style.display = "inline-block";
  closeBtnBox.style.margin = `0 0 0 ${dim / 6}px`;
  closeBtnBox.style.backgroundColor = cellColor;
  closeBtnBox.style.borderStyle = "solid";
  closeBtnBox.style.borderColor = backgroundColor;
  closeBtnBox.style.borderWidth = `${btnBorder}px`;
  closeBtnText.style.lineHeight = `${(dim / 16) - (2 * btnBorder)}px`;
  closeBtnText.style.fontSize = `${(dim / 24) - (2 * btnBorder)}px`;
  closeBtnText.style.textAlign = "center";

  applyBtnBox.style.height = `${(dim / 16) - (2 * btnBorder)}px`;
  applyBtnBox.style.width = `${dim / 6}px`;
  applyBtnBox.style.display = "inline-block";
  applyBtnBox.style.margin = `0 0 0 ${dim / 6}px`;
  applyBtnBox.style.backgroundColor = cellColor;
  applyBtnBox.style.borderStyle = "solid";
  applyBtnBox.style.borderColor = backgroundColor;
  applyBtnBox.style.borderWidth = `${btnBorder}px`;
  applyBtnText.style.lineHeight = `${(dim / 16) - (2 * btnBorder)}px`;
  applyBtnText.style.fontSize = `${(dim / 24) - (2 * btnBorder)}px`;
  applyBtnText.style.textAlign = "center";

  // .......... grid menu: row2 ...................................

  setRow2.style.width = "100%";
  setRow2.style.height = `${dim / 16}px`;

  document.getElementById('setRow2').appendChild(text1);
  text1.style.display = "inline-block";
  text1.style.lineHeight = `${(dim / 24)}px`;
  text1.style.fontSize = `${(dim / 36)}px`;
  text1.style.textAlign = "left";
  text1.style.color = cellColor;
  text1.style.margin = `0 0 0 ${dim / 64}px`;
  text1.innerHTML = "number of rows (0 < n < 65):";

  form1.appendChild(input1);
  form1.style.display = "inline-block";
  form1.style.margin = `0 0 0 ${dim / 96}px`;

  input1.style.width = `${dim / 30}px`;
  input1.style.height = `${(dim / 36)}px`;
  input1.style.lineHeight = `${(dim / 24)}px`;
  input1.style.fontSize = `${(dim / 42)}px`;
  input1.style.backgroundColor = cellColor;
  input1.style.color = backgroundColor;
  input1.style.border = "none";
  input1.style.textAlign = "center";
  input1.value = `${gridN}`;
  document.getElementById('setRow2').appendChild(form1);
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
  settingsOn = false;
}

function menuBtnHover(i) {
  menuBtnBoxes[i].style.backgroundColor = menuHoverColor;
  menuBtnText[i].style.color = cellColor;
}

function menuBtnUnhover(i) {
  menuBtnBoxes[i].style.backgroundColor = cellColor;
  menuBtnText[i].style.color = backgroundColor;
}

function clickApplyBtn() {
  gridN = input1.value;
  redrawPage();
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

let menuBtnBoxes = [closeBtnBox, applyBtnBox];
let menuBtnText = [closeBtnText, applyBtnText];

closeBtnText.style.color = backgroundColor;
closeBtnBox.addEventListener('mouseover', function(){return menuBtnHover(0)});
closeBtnBox.addEventListener('mouseout', function(){return menuBtnUnhover(0)});
let clickCloseBtnAtt = document.createAttribute("onclick");
clickCloseBtnAtt.value = "clickCloseBtn()";
closeBtnBox.setAttributeNode(clickCloseBtnAtt);

applyBtnText.style.color = backgroundColor;
applyBtnBox.addEventListener('mouseover', function(){return menuBtnHover(1)});
applyBtnBox.addEventListener('mouseout', function(){return menuBtnUnhover(1)});
let clickApplyBtnAtt = document.createAttribute("onclick");
clickApplyBtnAtt.value = "clickApplyBtn()";
applyBtnBox.setAttributeNode(clickApplyBtnAtt);

drawPage(); // Also called whenever window (body) is resized, via redrawPage()
drawSidebar();
