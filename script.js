let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function updateSelector() {
    const selector = document.getElementById('taskSelector');
    selector.innerHTML = '<option value="">Selecione uma tarefa</option>';
    tasks.forEach((task, index) => {
        let opt = document.createElement('option');
        opt.value = index;
        opt.textContent = task.name;
        selector.appendChild(opt);
    });
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
        for (let j = 0; j < 7; j++) {
            rows += `<td><input type="checkbox" onchange="saveCheck(${index}, ${i}, ${j})" id="check-${i}-${j}"></td>`;
        }
        rows += `</tr>`;
    }
    container.innerHTML = `<h3><center>${tasks[index].name.toUpperCase()}</center></h3><table>${rows}</table>`;
    
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

updateSelector();