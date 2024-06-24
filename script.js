document.addEventListener('DOMContentLoaded', (event) => {
    loadTable();
});

function loadTable() {
    let tableData = JSON.parse(localStorage.getItem('tableData')) || [];
    tableData.sort((a, b) => parseFloat(a['Окупаемость в часах']) - parseFloat(b['Окупаемость в часах']));
    
    const tableBody = document.getElementById('investmentTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    tableData.forEach((row, index) => {
        let newRow = tableBody.insertRow();
        
        for (let key in row) {
            let newCell = newRow.insertCell();
            let input = document.createElement('input');
            input.type = 'text';
            input.value = row[key];
            input.oninput = () => updateRow(index, key, input.value);
            newCell.appendChild(input);
        }
        
        let actionCell = newRow.insertCell();
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Удалить';
        deleteButton.onclick = () => deleteRow(index);
        actionCell.appendChild(deleteButton);
    });
}

function updateRow(index, key, value) {
    let tableData = JSON.parse(localStorage.getItem('tableData')) || [];
    tableData[index][key] = value;
    
    if (key === 'Прибыль в час' || key === 'Стоимость прокачки') {
        tableData[index]['Окупаемость в часах'] = (parseFloat(tableData[index]['Стоимость прокачки']) / parseFloat(tableData[index]['Прибыль в час'])).toFixed(2);
    }
    
    localStorage.setItem('tableData', JSON.stringify(tableData));
    updateTableRow(index, tableData[index]);
}

function updateTableRow(index, rowData) {
    const tableBody = document.getElementById('investmentTable').getElementsByTagName('tbody')[0];
    let row = tableBody.rows[index];

    let cells = row.getElementsByTagName('input');
    cells[0].value = rowData['Название карточки'];
    cells[1].value = rowData['Прибыль в час'];
    cells[2].value = rowData['Уровень'];
    cells[3].value = rowData['Стоимость прокачки'];
    cells[4].value = rowData['Окупаемость в часах'];
}

function addRow() {
    let tableData = JSON.parse(localStorage.getItem('tableData')) || [];
    tableData.push({
        'Название карточки': '',
        'Прибыль в час': '',
        'Уровень': '',
        'Стоимость прокачки': '',
        'Окупаемость в часах': ''
    });
    localStorage.setItem('tableData', JSON.stringify(tableData));
    loadTable();
}

function deleteRow(index) {
    let tableData = JSON.parse(localStorage.getItem('tableData')) || [];
    tableData.splice(index, 1);
    localStorage.setItem('tableData', JSON.stringify(tableData));
    loadTable();
}

