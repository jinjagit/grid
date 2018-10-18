// grid, by Simon Tharby, 2018

function drawPage() {
  cellHeight = (window.innerHeight / gridN);

  body.style.backgroundColor = backgroundColor;

  sidebarTrigger.style.position = "absolute";
  sidebarTrigger.style.zIndex = "1";
  sidebarTrigger.style.height = "100%";
  sidebarTrigger.style.width = `${window.innerHeight / 50}px`;

  grid.style.height = `${window.innerHeight}px`;
  grid.style.backgroundColor = backgroundColor;
  grid.style.display = "grid";
  grid.style.gridGap = gridGap;
  //grid.style.margin = "auto";
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
  console.log("on");
}

function triggerUnHover() {
  console.log("off");
}


let backgroundColor = "hsl(128, 20%, 35%)";
let menuHoverColor = "hsl(128, 20%, 65%)";
let cellColor = "black";

let gridN = 3;
let cellHeight = 0;
let gridGap = "1px";

let body = document.getElementsByTagName('body')[0];

sidebarTrigger.style.backgroundColor = "transparent";
sidebarTrigger.addEventListener('mouseover', triggerHover);
sidebarTrigger.addEventListener('mouseout', triggerUnHover);

drawPage(); // Also called whenever window (body) is resized
