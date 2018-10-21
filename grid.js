// grid, by Simon Tharby, 2018

function drawPage() {
  windowH = window.innerHeight;
  lastWindowH = windowH;
  cellHeight = windowH / gridY;
  borderW = windowH / 400;
  menuBoxH = windowH / 20;

  sidebarDiv.style.display = "none";
  waitMsg.style.display = "none";
  body.style.backgroundColor = gridColor;
  grid.style.display = "grid";
  grid.style.height = `${windowH}px`;
  grid.style.backgroundColor = gridColor;
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
  for (let i = 0; i < (gridX * gridY); i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.id = i.toString();

    cell.style.gridColumn = `${(i % gridX) + 1} / span 1`;
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
  function drawSetBtnsDynamic() {
    for (let i = 1; i < btnBoxes.length; i++) { // update loop start as add more menu btns

      if (i > 2) {
        btnBoxes[i].style.height = `${dim / 32}px`;
        btnBoxes[i].style.lineHeight = `${dim / 24}px`;
        btnBoxes[i].style.verticalAlign = "middle";
        btnBoxes[i].style.margin = `0 0 0 ${dim / 64}px`;
        btnText[i].style.lineHeight = `${dim / 32}px`;
        btnText[i].style.fontSize = `${dim / 36}px`;
        if (i < 4) {
          btnBoxes[i].style.width = `${dim / 24}px`;
        } else {
          btnBoxes[i].style.width = `${dim / 18}px`;
        }

      } else {
        btnBoxes[i].style.height = `${(dim / 16) - (2 * btnBorder)}px`;
        btnBoxes[i].style.width = `${dim / 6}px`;
        btnBoxes[i].style.margin = `0 0 0 ${dim / 6}px`;
        btnBoxes[i].style.borderWidth = `${btnBorder}px`;
        btnText[i].style.lineHeight = `${(dim / 16) - (2 * btnBorder)}px`;
        btnText[i].style.fontSize = `${(dim / 24) - (2 * btnBorder)}px`;
      }


    }
  }

  function drawSetTextDynamic() {
    for (let i = 0; i < settingsText.length; i++) {
      settingsText[i].style.lineHeight = `${(dim / 24)}px`;
      settingsText[i].style.fontSize = `${(dim / 36)}px`;
      settingsText[i].style.margin = `0 0 0 ${dim / 40}px`;
    }
  }

  settingsOn = true;
  let dim = windowH * 0.7; // size factor
  let sideMargin = (window.innerWidth - (dim / 2)) / 2;
  let btnBorder = dim / 200;

  // ......... for all settings menus ...............................

  for (let i = 1; i < 9; i++) {
    menuRows[i].style.width = "100%";
  }

  settingsBox.style.display = "block";
  settingsBox.style.width = `${dim / 2}px`;
  settingsBox.style.margin = `${dim / 4}px ${sideMargin}px ${dim / 4}px ${sideMargin}px`;

  settingsTitle.style.textAlign = "center";
  settingsTitle.style.lineHeight = `${dim / 16}px`;
  settingsTitle.style.color = cellColor;
  settingsTitle.style.fontSize = `${(dim / 24) - (2 * btnBorder)}px`;

  drawSetBtnsDynamic();
  drawSetTextDynamic();

  // .......... grid menu: row1 ...................................

  settingsTitle.innerHTML = "grid settings"

  // .......... grid menu: row2 ...................................

  setRow2.style.height = `${dim / 16}px`;
  document.getElementById('setRow2').appendChild(text1);
  text1.innerHTML = "number of rows (0 < n < 65):";

  form1.appendChild(input1);
  form1.style.display = "inline-block";
  form1.style.margin = `0 0 0 ${dim / 96}px`;

  input1.style.width = `${dim / 30}px`;
  input1.style.height = `${(dim / 36)}px`;
  input1.style.lineHeight = `${(dim / 24)}px`;
  input1.style.fontSize = `${(dim / 42)}px`;
  input1.style.backgroundColor = cellColor;
  input1.style.color = gridColor;
  input1.style.border = "none";
  input1.style.textAlign = "center";
  input1.value = `${gridY}`;
  document.getElementById('setRow2').appendChild(form1);

  // .......... grid menu: row3 ...................................

  setRow3.style.height = `${dim / 16}px`;
  document.getElementById('setRow3').appendChild(text2);
  colBtnBox.appendChild(colBtnText);
  document.getElementById('setRow3').appendChild(colBtnBox);
  document.getElementById('setRow3').appendChild(text2a);
  text2.innerHTML = "number of columns:";
  if (colDbl == true) {
    colBtnText.innerHTML = "2n";
  } else {
    colBtnText.innerHTML = "n";
  }
  text2a.innerHTML = `= ${gridX}`;

  // .......... grid menu: row4 ...................................

  setRow4.style.height = `${dim / 16}px`;
  document.getElementById('setRow4').appendChild(text3);
  text3.innerHTML = "grid lines:";
  linesBtnBox.appendChild(linesBtnText);
  document.getElementById('setRow4').appendChild(linesBtnBox);
  if (gridLines == true) {
    linesBtnText.innerHTML = "on";
  } else {
    linesBtnText.innerHTML = "off";
  }
}

function cellClick(clickedID) {
  console.log(`cell ID: ${clickedID}`);
  // to develop: for use in editing module(s) placement(s) & settings
}

function sidebarHover() {
  sidebarOn = true;
  if (windowH != lastSidebarH) {
    drawSidebar();
  }
  sidebarDiv.style.display = "inline-block";
}

function sidebarUnhover() {
  sidebarDiv.style.display = "none";
  sidebarOn = false;
}

function windowUnHover() {
  if (sidebarOn == true) {
    sidebarUnhover();
  }
}

function clickGridBtn() {
  drawSettings();
}

function clickCloseBtn() {
  settingsBox.style.display = "none";
  settingsOn = false;
}

function clickApplyBtn() {
  if (input1.value > 0 && input1.value < 65) {
    gridY = input1.value;
    if (colDbl == true) {
      gridX = gridY * 2;
    } else {
      gridX = gridY;
    }
  } else {
    window.alert('ERROR! invalid input:\n\nnumber of rows must be integer, 0 < n < 65');
  }
  redrawPage();
}

function clickColBtn() {
  if (colDbl == true) {
    gridX = gridY;
    colDbl = false;
  } else {
    gridX = gridY * 2;
    colDbl = true;
  }
  redrawPage();
}

function clickLinesBtn() {
  if (gridLines == true) {
    gridGap = "0";
    gridLines = false;
  } else {
    gridGap = "1px";
    gridLines = true;
  }
  redrawPage();
}

function menuBtnHover(i) {
  btnBoxes[i].style.backgroundColor = menuHoverColor;
  btnText[i].style.color = cellColor;
}

function menuBtnUnhover(i) {
  btnBoxes[i].style.backgroundColor = cellColor;
  btnText[i].style.color = gridColor;
}

function drawBtnStatic() {
  for (let i = 0; i < btnBoxes.length; i++) {
    if (i != 0) {
      btnBoxes[i].style.display = "inline-block";
    }
    btnBoxes[i].style.backgroundColor = cellColor;
    btnBoxes[i].style.borderColor = gridColor;
    btnBoxes[i].style.borderStyle = "solid";
    btnBoxes[i].addEventListener('mouseover', function(){return menuBtnHover(i)});
    btnBoxes[i].addEventListener('mouseout', function(){return menuBtnUnhover(i)});
    clickBtnAtt[i] = document.createAttribute("onclick");
    clickBtnAtt[i].value = clickBtnFuncs[i];
    btnBoxes[i].setAttributeNode(clickBtnAtt[i]);
    btnText[i].style.textAlign = "center";
    btnText[i].style.color = gridColor;
    btnText[i].style.textAlign = "center";
  }
}

let windowH = 0;
let lastWindowH = 0;
let lastSidebarH = 0;

let gridColor = "hsl(128, 30%, 40%)";
let menuHoverColor = "hsl(128, 30%, 65%)";
let cellColor = "black";

let gridY = 7;
let gridX = 14;
let cellHeight = 0;
let gridGap = "1px";
let borderW = 0;

let queueRedraw = false;
let sidebarOn = false;
let settingsOn = false;
let colDbl = true;
let gridLines = true;

let body = document.getElementsByTagName('body')[0];

body.style.fontFamily = "'Ubuntu Mono', monospace";
body.style.fontWeight = "normal";
body.addEventListener('mouseleave', windowUnHover);

let text1 = document.createElement('p');
let text2 = document.createElement('p');
let text2a = document.createElement('p');
let text3 = document.createElement('p');

let settingsText = [text1, text2, text2a, text3];
for (let i = 0; i < settingsText.length; i++) {
  settingsText[i].style.display = "inline-block";
  settingsText[i].style.textAlign = "left";
  settingsText[i].style.color = cellColor;
}

let form1 = document.createElement('form');
form1.setAttribute("method", "GET");
form1.setAttribute("action", "#");
form1.setAttribute("target", "_self");
let input1 = document.createElement("input");
input1.setAttribute("value", "");

waitMsg.style.color = gridColor;
waitMsg.style.display = "block";
waitMsg.style.textAlign = "center";

grid.style.display = "grid";
sidebarTrigger.style.position = "absolute";
sidebarTrigger.style.zIndex = "2";
sidebarTrigger.style.height = "100%";
sidebarTrigger.style.backgroundColor = "transparent";
sidebarTrigger.addEventListener('mouseover', sidebarHover);

sidebarDiv.style.position = "absolute";
sidebarDiv.style.zIndex = "1";
sidebarDiv.style.height = "100%";
sidebarDiv.style.display = "none";
sidebarDiv.style.backgroundColor = gridColor;
sidebarDiv.addEventListener('mouseout', sidebarUnhover);
sidebarDiv.addEventListener('mouseover', sidebarHover);

let menuRows = [];
for (let i = 1; i < 9; i++) {
  menuRows[i] = document.getElementById(`setRow${i}`);
}

titleBox.style.backgroundColor = cellColor;
titleBox.style.borderStyle = "solid";
titleBox.style.borderColor = gridColor;
titleBox.addEventListener('mouseover', sidebarHover);

settingsBox.style.display = "none";
settingsBox.style.position = "absolute";
settingsBox.style.zIndex = "3";
settingsBox.style.backgroundColor = gridColor;

let colBtnBox = document.createElement('div');
let colBtnText = document.createElement('p');
let linesBtnBox = document.createElement('div');
let linesBtnText = document.createElement('p');
let btnBoxes = [gridBtnBox, closeBtnBox, applyBtnBox, colBtnBox, linesBtnBox]; // menu == [0], settings == [1]..[2]
let btnText = [gridBtnText, closeBtnText, applyBtnText, colBtnText, linesBtnText];
let clickBtnAtt = [clickGridBtn, clickCloseBtn, clickApplyBtn, clickColBtn, clickLinesBtn];
let clickBtnFuncs = ["clickGridBtn()", "clickCloseBtn()", "clickApplyBtn()", "clickColBtn()", "clickLinesBtn()"];

drawBtnStatic();
drawPage(); // Also called whenever window (body) is resized, via redrawPage()
drawSidebar();

/* how to get right-click... (but not with id passed!)
document.getElementById("test").onmousedown = function(event) {
    if (event.which == 3) {
        alert("right clicked!");
    }
}
*/
