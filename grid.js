// grid, by Simon Tharby, 2018

function drawPage() {
  cellHeight = (window.innerHeight / gridN);

  body.style.backgroundColor = backgroundColor;

  sidebarTrigger.style.width = `${window.innerHeight / 100}px`;

  sidebarDiv.style.width = `${window.innerHeight / 10}px`;

  grid.style.height = `${window.innerHeight}px`;
  grid.style.backgroundColor = backgroundColor;
  grid.style.gridGap = gridGap;

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
  sidebarDiv.style.display = "inline-block";
}

function triggerUnHover() {
  sidebarDiv.style.display = "none";
}


let backgroundColor = "hsl(128, 20%, 35%)";
let menuHoverColor = "hsl(128, 20%, 65%)";
let cellColor = "black";

let gridN = 3;
let cellHeight = 0;
let gridGap = "1px";

let sidebarOn = false;

let body = document.getElementsByTagName('body')[0];

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
sidebarDiv.addEventListener('mouseout', triggerUnHover);
document.addEventListener('mouseout', triggerUnHover);

drawPage(); // Also called whenever window (body) is resized
