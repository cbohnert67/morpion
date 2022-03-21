var turn = "joueur1";
var grid = [[0,0,0], [0,0,0], [0,0,0]];
var cases = 9;

initListeners();



function initListeners() {
    for (let row = 0;  row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            document.getElementById(""+(row+1)+""+(col+1)).addEventListener('click', showMark);
        }
    }

}
function remListeners() {
    for (let row = 0;  row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            document.getElementById(""+(row+1)+""+(col+1)).removeEventListener('click', showMark);
        }
    }

}


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
    console.log(sums);
    if (max === 3 && cases != 9) {
        console.log("joueur1 !");
        return true;
    }
    if (min === -3 && cases !=9) {
        console.log("joueur2 !");
        
        return true;
    }

    return false;
    //     let finish = true;
    //     let zeroCounter = 9;
    //     for (let i = 0; i < grid.length; i++) {
    //         for (let j = 0; j < grid.length; j++) {
    //             if (grid[i][j] === 0) {
    //                 zeroCounter--;
    //                 finish=false;
    //             }
    //         }
    //     }
    //     if (zeroCounter === 0) {
    //         console.log("Egalité !")
        // }
        // return finish;
    }





function showMark(elt) {
    cases--;
    if (turn === "joueur1") {
        elt.target.innerHTML = `<svg width="103" height="103"><circle cx="55" cy="49" r="44" fill="none" stroke="blue" stroke-width="3" /></svg>`;
        let row = parseInt(elt.target.id[0]);
        let col = parseInt(elt.target.id[1]);
        grid[row-1][col-1]=1;
        turn = "joueur2";
        if (isWon()) {
            remListeners();
            return;
        }
        if (!isWon() && cases === 0) {
            remListeners();
            console.log('Egalité !');
            return;
        }
        return;
    } 
     if (turn === "joueur2") {
        elt.target.innerHTML = `<svg width="103" height="103"><path d="M 10 10 L 90 90" stroke="blue" stroke-width="3"/><path d="M 90 10 L 10 90" stroke="blue" stroke-width="3"/></svg>`;
        let row = parseInt(elt.target.id[0]);
        let col = parseInt(elt.target.id[1]);
        grid[row-1][col-1]=-1;
        turn = "joueur1";
        if (isWon()) {
            remListeners();
            return;
        }
        if (!isWon() && cases === 0) {
            remListeners();
            console.log('Egalité !');
            return;
        }
        return;
    }
}

