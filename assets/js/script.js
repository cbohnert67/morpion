var turn = true;
var grid = [[0,0,0], [0,0,0], [0,0,0]];
var left = 9;
var circle = `<svg width="103" height="103"><circle cx="55" cy="49" r="44" fill="none" stroke="blue" stroke-width="3" /></svg>`;
var cross = `<svg width="103" height="103"><path d="M 10 10 L 90 90" stroke="blue" stroke-width="3"/><path d="M 90 10 L 10 90" stroke="blue" stroke-width="3"/></svg>`;



initListeners();


// Add event listeners to the game cells
function initListeners() {
    let rows = document.getElementById("grid").children;
    for (let row of rows) {
        for (let cell of row.cells) {
            document.getElementById(cell.id).addEventListener('click', playTurn);
        }
    }
}

// Remove event listeners to the game cells
function remListeners() {
    let rows = document.getElementById("grid").children;
    for (let row of rows) {
        for (let cell of row.cells) {
            document.getElementById(cell.id).removeEventListener('click', playTurn);
        }
    }
    
}

// check whether game is won or draw
function isWon() {
    let sums = [];
    for (let i = 0; i < grid.length; i++) {
        let sumL = 0;
        let sumC = 0;
        for (let j = 0; j < grid.length; j++) {
            sumL += grid[i][j];
            sumC += grid[j][i];
        }
        sums.push(sumL);
        sums.push(sumC);
    }
   
    let sumD1 = grid[0][0]+grid[1][1]+grid[2][2];
    sums.push(sumD1);
    let sumD2 = grid[2][0]+grid[1][1]+grid[0][2];
    sums.push(sumD2);
    
    let max = Math.max.apply(null, sums);
    let min = Math.min.apply(null, sums);
    //console.log(sums);
    if (max === 3 && left != 9) {
        displayWinner("Joueur 1");
        return true;
    }
    if (min === -3 && left !=9) {
        displayWinner("Joueur 2");
        return true;
    }

    return false;
}




// player 1 (circle) or player 2 (cross) plays a turn
function playTurn(elt) {
    left--;
    if (turn === true) {
        turnAction(elt, circle, 1);
        return;
    } 
     if (turn === false) {
        turnAction(elt, cross, -1);
        return;
    }
}

function displayWinner(player) {
   
    document.getElementsByTagName('p')[0].innerText = `${player} a gagné !`;
    //document.getElementsByTagName('p')[0].style.display = 'none';
    //document.getElementById('result').innerText = `${player} a gagné !`;
    
}

function displayDraw() {
    document.getElementsByTagName('p')[0].innerText = "Egalité !";
    // document.getElementsByTagName('p')[0].style.display = 'none';
    // document.getElementById('result').innerText = "Egalité !";
}

function turnAction(elt, svg, player) {
        elt.target.innerHTML = svg
        elt.target.removeEventListener('click', playTurn);
        let row = parseInt(elt.target.id[0]);
        let col = parseInt(elt.target.id[1]);
        grid[row-1][col-1]=player;
        turn = !turn;
        if (isWon()) {
            remListeners();
            return;
        }
        if (!isWon() && left === 0) {
            remListeners();
            displayDraw();
            return;
        }
        return;
}