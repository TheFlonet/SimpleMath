const state = {
    type: null,
    sol: null,
    nums: null,
    displayMode: null,
    asc: false
};

document.getElementById('startBtn').addEventListener('click', generate);

function generate() {
    state.type = null;
    state.sol = null;
    state.nums = null;
    state.displayMode = null;
    state.asc = false;

    const esTypes = ["+", "-", "sort"];
    state.type = esTypes[Math.floor(Math.random() * esTypes.length)];;

    let html = '';

    if (state.type === "+") {
        const a = Math.floor(Math.random() * 11);
        const b = Math.floor(Math.random() * (11 - a));
        state.sol = a + b;
        html += `<div id="esercizio">${a} + ${b} = ?</div>`;
        // html += `<div id="displayArea" class="items" aria-hidden="true"></div>`;
    } else if (state.type === "-") {
        const a = Math.floor(Math.random() * 11);
        const b = Math.floor(Math.random() * (a + 1));
        state.sol = a - b;
        html += `<div id="esercizio">${a} - ${b} = ?</div>`;
        // html += `<div id="displayArea" class="items" aria-hidden="true"></div>`;
    } else {
        const count = Math.floor(Math.random() * 2) + 3;
        const arr = [];
        while (arr.length < count) {
            const n = Math.floor(Math.random() * 10) + 1;
            if (!arr.includes(n)) arr.push(n);
        }
        state.nums = arr;
        const asc = Math.random() < 0.5;
        state.asc = asc;
        state.sol = [...arr].sort((a, b) => asc ? a - b : b - a);
        const displayMode = Math.random() < 0.5 ? "nums" : "shapes";
        state.displayMode = displayMode;

        if (asc) {
            html += `<div id="esercizio">Ordina i numeri dal più piccolo al più grande</div>`;
        } else {
            html += `<div id="esercizio">Ordina i numeri dal più grande al più piccolo</div>`;
        }

        if (displayMode === "nums") {
            html += `<div id="displayArea" class="items">` +
                arr.map(n => `<div class="item number">${n}</div>`).join('') + `</div>`;
        } else {
            html += `<div id="displayArea" class="items">` +
                arr.map(n => `<div class="item shape" style="height:${20 + n * 10}px" aria-label="${n}" title="valore ${n}"></div>`).join('') +
                `</div>`;
        }
    }

    html += `
        <div class="controls">
          <button id="showBtn">Mostra la sol</button>
          <button id="newBtn">Nuovo esercizio</button>
        </div>
        <div id="sol" aria-live="polite"></div>
      `;

    document.getElementById('container').innerHTML = html;
    document.getElementById('showBtn').addEventListener('click', showSol);
    document.getElementById('newBtn').addEventListener('click', generate);
}

function showSol() {
    const solDiv = document.getElementById('sol');
    if (!solDiv || solDiv.style.display === 'block') return;

    if (state.type === 'sort') {
        if (state.displayMode === 'nums') {
            solDiv.innerHTML = `
            <div class="items">` +
                state.sol.map(n => `<div class="item number">${n}</div>`).join('') +
                `</div>`;
        } else {
            solDiv.innerHTML = `
            <div class="items">` +
                state.sol.map(n => `<div class="item shape" style="height:${20 + n * 10}px" aria-label="${n}" title="valore ${n}"></div>`).join('') +
                `</div>`;
        }
    } else {
        solDiv.innerHTML = `
          <div class="items">
            <div class="item number">${state.sol}</div>
          </div>
        `;
    }

    solDiv.style.display = 'block';
    const showBtn = document.getElementById('showBtn');
    if (showBtn) showBtn.disabled = true;
}