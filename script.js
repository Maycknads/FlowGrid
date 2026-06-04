let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function updateSelector() {
    const selector = document.getElementById('taskSelector');
    selector.innerHTML = '<option value="">Selecione...</option>';
    tasks.forEach((task, index) => {
        let opt = document.createElement('option');
        opt.value = index;
        opt.textContent = task.name;
        selector.appendChild(opt);
    });
}

function updateCounter() {
    const index = document.getElementById('taskSelector').value;
    const counterDiv = document.getElementById('counter');
    if (index === "") { counterDiv.innerText = ""; return; }
    
    // Soma quantos checkboxes estão como 'true'
    let count = 0;
    tasks[index].data.forEach(row => row.forEach(val => { if (val) count++; }));
    counterDiv.innerText = `Total: ${count} dias`;
}

function createTask() {
    const input = document.getElementById('taskInput');
    if (!input.value) return;
    const emptyState = Array(10).fill().map(() => Array(7).fill(false));
    tasks.push({ name: input.value, data: emptyState });
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    updateSelector();
    input.value = "";
}

function deleteTask() {
    const index = document.getElementById('taskSelector').value;
    if (index === "") return;
    tasks.splice(index, 1);
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    document.getElementById('tableContainer').innerHTML = "";
    updateCounter();
    updateSelector();
}

function renderTable() {
    const container = document.getElementById('tableContainer');
    const index = document.getElementById('taskSelector').value;
    if (index === "") { container.innerHTML = ""; updateCounter(); return; }
    
    const dias = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];
    let header = dias.map(d => `<th>${d}</th>`).join('');
    let rows = "";
    for (let i = 0; i < 10; i++) {
        rows += `<tr>` + Array(7).fill(0).map((_, j) => 
            `<td><input type="checkbox" onchange="saveCheck(${index}, ${i}, ${j})" id="check-${i}-${j}"></td>`
        ).join('') + `</tr>`;
    }
    container.innerHTML = `<h3><center>${tasks[index].name.toUpperCase()}</center></h3><table><thead><tr>${header}</tr></thead><tbody>${rows}</tbody></table>`;
    
    tasks[index].data.forEach((row, rIdx) => {
        row.forEach((checked, cIdx) => {
            const cb = document.getElementById(`check-${rIdx}-${cIdx}`);
            if(cb) cb.checked = checked;
        });
    });
    updateCounter();
}

function saveCheck(taskIdx, rowIdx, colIdx) {
    tasks[taskIdx].data[rowIdx][colIdx] = document.getElementById(`check-${rowIdx}-${colIdx}`).checked;
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    updateCounter();
}

updateSelector();