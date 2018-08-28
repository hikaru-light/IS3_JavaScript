let cvs;
let ctx;
let timer;
let running = 0;

let CELLS = new Array();
let COLS;
let ROWS;
const CELL_SIZE = 25;

window.onload = () => {
	init();
};

function init() {
	cvs = document.getElementById("game");
	ctx = cvs.getContext("2d");
	cvs.addEventListener("click", cvsClick, false)

	if(!cvs || !cvs.getContext) {
		return false;
	}

	ctx.fillStyle = "rgb(50, 50, 50)";
	ctx.fillRect(0, 0, cvs.width, cvs.height);

	COLS = Math.floor(cvs.width / CELL_SIZE);
	ROWS = Math.floor(cvs.height / CELL_SIZE);
	
	if(state) {
		let data = state.split(',');
		let i = 0;
		for(row=0; row<ROWS; row++) {
			CELLS[row] = new Array();
			for(col=0; col<COLS; col++) {
				if(data[i]==="true") {
					data[i] = "1";
				}

				CELLS[row][col] = Number(data[i]);
				i++;
			}
		}
	} else {
		for(row=0; row<ROWS; row++) {
			CELLS[row] = new Array();
			for(col=0; col<COLS; col++) {
				CELLS[row][col] = 0;
			}
		}
	}

	redraw();
}

function redraw() {
	for(row=0; row<ROWS; row++) {
		for(col=0; col<COLS; col++) {
			drawCell(col, row);
		}
	}
}

function drawCell(x, y) {
	ctx.fillStyle = CELLS[y][x] ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";
	ctx.fillRect(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE -1, CELL_SIZE -1);
}

function randomCells() {
	for(row=0; row<ROWS; row++) {
		for(col=0; col<COLS; col++) {
			CELLS[row][col] = Math.round(Math.random());
		}
	}

	redraw();
}

function cvsClick(e) {
	let x = e.clientX - cvs.offsetLeft;
	let y = e.clientY - cvs.offsetTop;

	let col = Math.floor(x / CELL_SIZE);
	let row = Math.floor(y / CELL_SIZE);

	CELLS[row][col] = ! CELLS[row][col];
	drawCell(col, row);
}

function update() {
	let tmp = new Array();
	for(row=0; row<ROWS; row++) {
		tmp[row] = new Array();
		for(col=0; col<COLS; col++) {
			let num = count(col, row);
			if(CELLS[row][col]) {
				if(num == 2 || num == 3) {
					tmp[row][col] = 1;
				} else {
					tmp[row][col] = 0;
				}
			} else {
				if(num == 3) {
					tmp[row][col] = 1;
				} else {
					tmp[row][col] = 0;
				}
			}
		}
	}

	CELLS = tmp;
	redraw();
}

function count(x, y) {
	let count = 0;
	
	for(i=-1; i<=1; i++) {
		for(j=-1; j<=1; j++) {
			if(x+j>=0 && x+j<COLS && y+i>=0 && y+i<ROWS) {
				count += CELLS[y+i][x+j];
			}
		}
	}

	count -= CELLS[y][x];

	return count;
}

document.getElementById("update").addEventListener("click", () => {
	if(running) {
		return;
	} else {
		running = 1;
		timer = setInterval(function() {
				update();
			}, 500);
	}
});

document.getElementById("stop").addEventListener("click", () => {
	if(running) {
		running = 0;
		clearInterval(timer);
	} else {
		return;
	}
});

document.getElementById("random").addEventListener("click", () => {
	randomCells();
});

document.getElementById("reset").addEventListener("click", () => {
	for(row=0; row<ROWS; row++) {
		for(col=0; col<COLS; col++) {
			CELLS[row][col] = 0;
		}
	}

	redraw();
});

document.getElementById("add").addEventListener("click", () => {
	let temp = new Array();
	let i = 0;

	for(row=0; row<ROWS; row++) {
		for(col=0; col<COLS; col++) {
			temp[i] = CELLS[row][col];
			i++;
		}
	}
	
	let data = temp.join(",");

	let form = document.getElementById("form");
	let input = document.createElement("input");
	input.setAttribute( 'type' , 'hidden' );
	input.setAttribute( 'name' , 'data' );
	input.setAttribute( 'value' , data );
	form.appendChild( input );
});

