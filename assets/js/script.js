// creazione matrice dinamica
var trisMatrix = [];
const row = 3;
const column = 3;

for (let r = 0; r < row; r++) {
  trisMatrix[r] = [];
  for (let c = 0; c < column; c++) {
    trisMatrix[r][c] = 0; // setting zero
  }
}
console.log(
  "Matrice creata con successo. Setting primo elemento " + trisMatrix[0][0]
);

// variabili motore
var table = document.getElementById("tris");
var partitaVinta = false;
var turno = 1; // inizialmente, il turno è per il giocatore 1 (X)

//variabili punteggio
var ingressoX = 0;
var ingressoO = 0;

// motore principale
function trisEngine(row, cell) {
  if (trisMatrix[row][cell] === 0 && partitaVinta === false) {
    // Controlla se la cella è vuota
    writeOnMatrix(row, cell, turno);

    // Cambia turno
    turno = turno === 1 ? 2 : 1;

    // Controllo vittoria
    let vincitore = checkVictory();
    if (vincitore) {
      let box = document.getElementById("vincita");
      let btn = document.getElementById("btn");
      box.innerHTML =
        vincitore === 1
          ? "HA VINTO IL GIOCATORE X!"
          : "HA VINTO IL GIOCATORE O!";
      btn.style.visibility = "visible";
      punteggio(vincitore);
      partitaVinta = true; // ferma il gioco
    } else if (checkDraw()) {
      let box = document.getElementById("vincita");
      box.innerHTML = "PAREGGIO!";
      btn.style.visibility = "visible";
      partitaVinta = true; // ferma il gioco
    }
  } else {
    console.log("Cella già occupata!"); // Puoi anche usare un messaggio di errore
  }
}

// scrittura matrice
function writeOnMatrix(row, cell, turno) {
  trisMatrix[row][cell] = turno; // Aggiorna la matrice con il valore del giocatore
  let symbol = turno === 1 ? "x" : "O"; // Assegna "X" per il giocatore 1 e "O" per il giocatore 2
  table.rows[row].cells[cell].innerHTML = symbol; // Scrivi il simbolo nella cella
}

// Controllo vittoria
function checkVictory() {
  // Controllo righe
  for (let r = 0; r < row; r++) {
    if (
      trisMatrix[r][0] === trisMatrix[r][1] &&
      trisMatrix[r][1] === trisMatrix[r][2] &&
      trisMatrix[r][0] !== 0
    ) {
      return trisMatrix[r][0]; // restituisce 1 (X) o 2 (O)
    }
  }

  // Controllo colonne
  for (let c = 0; c < column; c++) {
    if (
      trisMatrix[0][c] === trisMatrix[1][c] &&
      trisMatrix[1][c] === trisMatrix[2][c] &&
      trisMatrix[0][c] !== 0
    ) {
      return trisMatrix[0][c]; // restituisce 1 (X) o 2 (O)
    }
  }

  // Controllo diagonale principale
  if (
    trisMatrix[0][0] === trisMatrix[1][1] &&
    trisMatrix[1][1] === trisMatrix[2][2] &&
    trisMatrix[0][0] !== 0
  ) {
    return trisMatrix[0][0]; // restituisce 1 (X) o 2 (O)
  }

  // Controllo diagonale inversa
  if (
    trisMatrix[0][2] === trisMatrix[1][1] &&
    trisMatrix[1][1] === trisMatrix[2][0] &&
    trisMatrix[0][2] !== 0
  ) {
    return trisMatrix[0][2]; // restituisce 1 (X) o 2 (O)
  }

  return 0; // nessun vincitore
}

function checkDraw() {
  // Se c'è un vincitore, non è un pareggio
  let vincitore = checkVictory();
  if (vincitore !== 0) {
    return false;
  }

  // Controlla se tutte le celle sono occupate
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < column; c++) {
      if (trisMatrix[r][c] === 0) {
        return false; // Se una cella è vuota, non è un pareggio
      }
    }
  }

  return true; // Tutte le celle sono occupate, quindi è un pareggio
}

function reset(param) {
  // Ottieni la tabella tramite l'id (o un altro selettore)
  var table = document.getElementById("tris"); // Modifica "tris" con l'id della tua tabella

  // Scorri tutte le righe della tabella
  for (var r = 0; r < table.rows.length; r++) {
    // Scorri tutte le celle di ogni riga
    for (var c = 0; c < table.rows[r].cells.length; c++) {
      // Imposta il contenuto della cella a una stringa vuota
      table.rows[r].cells[c].innerHTML = "";
    }
  }

  //pulizia matrice
  for (let r = 0; r < row; r++) {
    trisMatrix[r] = [];
    for (let c = 0; c < column; c++) {
      trisMatrix[r][c] = 0; // setting zero
    }
  }

  //setting nuova partita
  partitaVinta = false;
  document.getElementById("vincita").innerHTML = "";
  document.getElementById("btn").style.visibility = "hidden";
  if (param) document.getElementById("punteggio").innerHTML = "0 - 0";
}

function punteggio(point) {
  if (point === 1) {
    ingressoX++;
  } else if (point === 2) {
    ingressoO++;
  }
  document.getElementById("punteggio").innerHTML =
    ingressoX + " - " + ingressoO;
}
