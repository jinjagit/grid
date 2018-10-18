// grid, by Simon Tharby, 2018

function drawPage() {
  cellHeight = window.innerHeight / gridN;
  borderW = window.innerHeight / 400;
  menuBoxH = window.innerHeight / 20;

  body.style.backgroundColor = backgroundColor;

  sidebarTrigger.style.width = `${window.innerHeight / 100}px`;
  sidebarDiv.style.width = `${menuBoxH * 2}px`;
  titleBox.style.height = `${menuBoxH * 2}px`;
  titleBox.style.borderWidth = `${borderW}px ${borderW}px 0 ${borderW}px`;
  gridBtnBox.style.height = `${menuBoxH}px`;
  gridBtnBox.style.borderWidth = `${borderW}px ${borderW}px 0 ${borderW}px`;

  grid.style.height = `${window.innerHeight}px`;
  grid.style.backgroundColor = backgroundColor;
  grid.style.gridGap = gridGap;

  gridBtnText.style.lineHeight = `${menuBoxH}px`;
  gridBtnText.style.fontSize = `${menuBoxH / 2}px`;

  destroyCells();
  drawCells();
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

function cellClick(clickedID) {

}

function triggerHover() {
  sidebarOn = true;
  sidebarDiv.style.display = "inline-block";
}

function triggerUnhover() {
  sidebarDiv.style.display = "none";
}

function gridHover() {
  triggerHover();
  gridBtnBox.style.backgroundColor = menuHoverColor;
}

function gridUnhover() {
  gridBtnBox.style.backgroundColor = cellColor;
}

function windowUnHover() {
  if (sidebarOn == true) {
    sidebarDiv.style.display = "none";
    sidebarOn = false;
  }
}

function clickGrid() {
  console.log("clicked");
}


let backgroundColor = "hsl(128, 20%, 35%)";
let menuHoverColor = "hsl(128, 20%, 10%)";
let cellColor = "black";

let gridN = 3;
let cellHeight = 0;
let gridGap = "1px";
let borderW = 0;

let sidebarOn = false;

let body = document.getElementsByTagName('body')[0];

body.style.fontFamily = "'Ubuntu Mono', monospace";
body.style.fontWeight = "normal";

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
