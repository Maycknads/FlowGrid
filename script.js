<<<<<<< HEAD
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function createBubble() {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random() * 50 + 20 + 'px';
    b.style.width = size; b.style.height = size;
    b.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 3000);
}

function createTask() {
    const input = document.getElementById('taskInput');
    if (!input.value) return;
    for(let i=0; i<10; i++) createBubble();
    const emptyState = Array(10).fill().map(() => Array(7).fill(false));
    tasks.push({ name: input.value, data: emptyState });
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    updateSelector();
    input.value = "";
}

document.getElementById('taskInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') createTask(); });

function updateSelector() {
    const selector = document.getElementById('taskSelector');
    selector.innerHTML = '<option value="">Selecione uma tarefa</option>';
    tasks.forEach((task, index) => selector.innerHTML += `<option value="${index}">${task.name}</option>`);
}

function deleteTask() {
    const index = document.getElementById('taskSelector').value;
    if (index === "") return;
    tasks.splice(index, 1);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    document.getElementById('tableContainer').innerHTML = "";
    updateSelector();
}

function renderTable() {
    const container = document.getElementById('tableContainer');
    const index = document.getElementById('taskSelector').value;
    container.innerHTML = "";
    if (index === "") return;
    let rows = "";
    for (let i = 0; i < 10; i++) {
        rows += `<tr>`;
        for (let j = 0; j < 7; j++) rows += `<td><input type="checkbox" onchange="saveCheck(${index}, ${i}, ${j})" id="check-${i}-${j}"></td>`;
        rows += `</tr>`;
    }
    container.innerHTML = `<h3><center><span style="color: #00f2ff;">${tasks[index].name.toUpperCase()}</span></center></h3><table><thead><tr><th>SEG</th><th>TER</th><th>QUA</th><th>QUI</th><th>SEX</th><th>SÁB</th><th>DOM</th></tr></thead><tbody>${rows}</tbody></table>`;
    tasks[index].data.forEach((row, rIdx) => {
        row.forEach((checked, cIdx) => {
            const cb = document.getElementById(`check-${rIdx}-${cIdx}`);
            if(cb) cb.checked = checked;
        });
    });
}

function saveCheck(taskIdx, rowIdx, colIdx) {
    tasks[taskIdx].data[rowIdx][colIdx] = document.getElementById(`check-${rowIdx}-${colIdx}`).checked;
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

=======
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function createBubble() {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = Math.random() * 50 + 20 + 'px';
    b.style.width = size; b.style.height = size;
    b.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 3000);
}

function createTask() {
    const input = document.getElementById('taskInput');
    if (!input.value) return;
    for(let i=0; i<10; i++) createBubble();
    const emptyState = Array(10).fill().map(() => Array(7).fill(false));
    tasks.push({ name: input.value, data: emptyState });
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    updateSelector();
    input.value = "";
}

document.getElementById('taskInput').addEventListener('keypress', (e) => { if (e.key === 'Enter') createTask(); });

function updateSelector() {
    const selector = document.getElementById('taskSelector');
    selector.innerHTML = '<option value="">Selecione uma tarefa</option>';
    tasks.forEach((task, index) => selector.innerHTML += `<option value="${index}">${task.name}</option>`);
}

function deleteTask() {
    const index = document.getElementById('taskSelector').value;
    if (index === "") return;
    tasks.splice(index, 1);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    document.getElementById('tableContainer').innerHTML = "";
    updateSelector();
}

function renderTable() {
    const container = document.getElementById('tableContainer');
    const index = document.getElementById('taskSelector').value;
    container.innerHTML = "";
    if (index === "") return;
    let rows = "";
    for (let i = 0; i < 10; i++) {
        rows += `<tr>`;
        for (let j = 0; j < 7; j++) rows += `<td><input type="checkbox" onchange="saveCheck(${index}, ${i}, ${j})" id="check-${i}-${j}"></td>`;
        rows += `</tr>`;
    }
    container.innerHTML = `<h3><center><span style="color: #00f2ff;">${tasks[index].name.toUpperCase()}</span></center></h3><table><thead><tr><th>SEG</th><th>TER</th><th>QUA</th><th>QUI</th><th>SEX</th><th>SÁB</th><th>DOM</th></tr></thead><tbody>${rows}</tbody></table>`;
    tasks[index].data.forEach((row, rIdx) => {
        row.forEach((checked, cIdx) => {
            const cb = document.getElementById(`check-${rIdx}-${cIdx}`);
            if(cb) cb.checked = checked;
        });
    });
}

function saveCheck(taskIdx, rowIdx, colIdx) {
    tasks[taskIdx].data[rowIdx][colIdx] = document.getElementById(`check-${rowIdx}-${colIdx}`).checked;
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

>>>>>>> a81d09e (tirei a animação das bolhas, pois estava causando lentidão no navegador.)
updateSelector();