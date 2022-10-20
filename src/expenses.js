import { generateId, getCategory, getData, getParsedDate, setData } from "./utils.js";

const expensesForm = document.getElementById('new-expense');
const tbody = document.querySelector('.editor tbody');
const dateElement = document.querySelector('input[name="date"]');
const cancelBtn = document.querySelector('.centered [type="reset"]');

tbody.addEventListener('click', onEdit);
expensesForm.addEventListener('submit', onSubmit);

let mode = 'create';
let currId = undefined;

cancelBtn.addEventListener('click', event => {
    mode = 'create';
    currId = undefined;
})

// let recordsMap = new Map([['04e268',{
//     id: '04e268',
//     date: '2022-10-22',
//     name: 'Fitness',
//     category: '1',
//     amount: '50'
// }]]);
let recordsMap = getData();

debugger;
let values = Array.from(recordsMap.values()).map(createExpenseRow);
tbody.replaceChildren(...values);


function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let entriesData = Object.fromEntries(formData);

    let id;

    switch (mode) {
        case 'create':
            id = generateId();
            break;
        case 'edit':
            id = currId;
            break;
    }

    let record = {
        id: id,
        ...entriesData
    };

    recordsMap.set(record.id, record);
    let trRow = createExpenseRow(record);

    if (mode == 'create') {

        tbody.appendChild(trRow);

    } else if (mode == 'edit') {

        let oldChild = document.getElementById(id);
        tbody.replaceChild(trRow, oldChild);
        mode = 'create';
        currId = undefined;
    }

    expensesForm.reset();
    dateElement.value = entriesData.date;

    debugger;

    setData(recordsMap);
}

function createExpenseRow(record) {

    let recordValues = Object.values(record);

    if (recordValues.some(x => x.length == 0)) {
        throw new Error("You have an empty field");
    }

    let id = record.id;
    let date = record.date;
    let recordName = record.name;
    let category = record.category;
    let amount = record.amount;

    let parsedDate = getParsedDate(date);
    let choosedCategory = getCategory(category);

    const trElement = document.createElement('tr');

    trElement.innerHTML =
        `<tr>
        <td>${`${parsedDate}`}</td>
        <td>${recordName}</td>
        <td>${choosedCategory}</td>
        <td><span class="currency">${amount}</span></td>
        <td><button>Edit</button><button>Delete</button></td>
     </tr>`;
    trElement.id = id;

    return trElement;
}

function onEdit(event) {

    if (event.target.tagName == 'BUTTON') {

        let trElement = event.target.parentElement.parentElement;

        if (event.target.innerHTML == 'Delete') {

            if (confirm('Are you sure you want to delete this element?')) {
                debugger;
                trElement.remove();
                recordsMap.delete(trElement.id);
                setData(recordsMap);
            }
        } else if (event.target.innerHTML == 'Edit') {
            debugger;
            editRow(trElement);
        }
    }
}

function editRow(row) {

    let searchedRow = recordsMap.get(row.id);

    let dateInput = expensesForm.querySelector('[name="date"]');
    let nameInput = expensesForm.querySelector('[name="name"]');
    let categoryInput = expensesForm.querySelector('[name="category"]');
    let amountInput = expensesForm.querySelector('[name="amount"]');

    dateInput.value = searchedRow.date;
    nameInput.value = searchedRow.name;
    categoryInput.value = searchedRow.category;
    amountInput.value = searchedRow.amount;

    currId = row.id
    mode = 'edit';
}




//window.records = recordsMap;


