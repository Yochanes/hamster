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
            input.oninput = () => updateRow(index);
            newCell.appendChild(input);
        }
        
        let actionCell = newRow.insertCell();
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Удалить';
        deleteButton.onclick = () => deleteRow(index);
        actionCell.appendChild(deleteButton);
    });
}

function updateRow(index) {
    const tableBody = document.getElementById('investmentTable').getElementsByTagName('tbody')[0];
    let tableData = JSON.parse(localStorage.getItem('tableData')) || [];
    let row = tableBody.rows[index];
    let rowData = {};
    
    row.querySelectorAll('input').forEach((input, colIndex) => {
        let key = ['Название карточки', 'Прибыль в час', 'Уровень', 'Стоимость прокачки', 'Окупаемость в часах'][colIndex];
        rowData[key] = input.value;
    });

    rowData['Окупаемость в часах'] = (parseFloat(rowData['Стоимость прокачки']) / parseFloat(rowData['Прибыль в час'])).toFixed(2);
    row.querySelectorAll('input')[4].value = rowData['Окупаемость в часах'];
    
    tableData[index] = rowData;
    localStorage.setItem('tableData', JSON.stringify(tableData));
    loadTable(); // Перезагрузить таблицу для обновления сортировки
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

