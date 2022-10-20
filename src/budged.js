import { generateId, getParsedYearMonth, setData, getData } from "./utils.js";

let mode = 'create';
let currId = undefined;

const budgedForm = document.getElementById('new-budget');
const tbodyElement = document.querySelector('.editor tbody');
const cancelBtn = document.querySelector('.centered [type="reset"]');

budgedForm.addEventListener('submit', onSubmit);
tbodyElement.addEventListener('click', onTableClick);

cancelBtn.addEventListener('click', event => {
    mode = 'create';
    currId = undefined;
})
debugger;

let recordsMap = getData(2);

// let recordsMap = new Map([['028e267', {
//     id: '028e267',
//     date: 'May-2024',
//     income: '5000',
//     budget: '4000',
// }]]);


let values = Array.from(recordsMap.values()).map(createBudgetRow);
tbodyElement.replaceChildren(...values);

function onTableClick(event) {
    // debugger;
    if (event.target.tagName == 'BUTTON') {

        if (event.target.innerText == 'Edit') {
            onEdit(event.target);

        } else if (event.target.innerText == 'Delete') {      
            onDelete(event.target);
        }
    }
}
function onEdit(target) {
    let trElement = target.parentElement.parentElement;
    let searchedRow = recordsMap.get(trElement.id);

    let month = document.querySelector('.clear [name="month"]');
    let income = document.querySelector('.clear [name="income"]');
    let budget = document.querySelector('.clear [name="budget"]');
    debugger;
    month.value = searchedRow.date;
    income.value = searchedRow.income;
    budget.value = searchedRow.budget;

    mode = 'edit';
    currId = trElement.id;
}

function onDelete(target) {
    if (confirm('Are you sure you want to delete this element?')) {

        let trElement = target.parentElement.parentElement;
        trElement.remove()
        recordsMap.delete(trElement.id);  
        setData(recordsMap);
    }
}

function onSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.target);

    let dateInput = formData.get('month').trim();
    let incomeInput = formData.get('income').trim();
    let budgetInput = formData.get('budget').trim();

    if (dateInput.length > 0 && incomeInput.length > 0 && budgetInput.length > 0) {

        let parsedDate = getParsedYearMonth(dateInput);

        // TODO:
        // if((parsedDate == "undefined.NaN")){
        //     throw new Error('Invalid Date');
        // }

        //debugger;

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
            date: parsedDate,
            income: incomeInput,
            budget: budgetInput
        };

        recordsMap.set(record.id, record);
      
        let row = createBudgetRow(record);
        row.id = record.id;

        if (mode == 'create') {
            tbodyElement.appendChild(row);

        } else if (mode == 'edit') {
            let oldChild = document.getElementById(id);
            tbodyElement.replaceChild(row, oldChild);
            mode = 'create';
            currId = undefined;
        }
        event.target.reset();
         debugger;
        setData(recordsMap);

    } else {
        throw new Error("You have an empty field");
    }
}

function createBudgetRow(record) {
    let id = record.id;
    let date = record.date;
    let income = record.income;
    let budget = record.budget; 

    let parsedDate = date.replace('-', '.');
    let trElement = document.createElement('tr');

    trElement.innerHTML =
        `<tr>
        <td>${parsedDate}</td>
        <td><span class="currency">${income}</span></td>
        <td><span class="currency">${budget}</span></td>
        <td><button>Edit</button><button>Delete</button></td>
     </tr>`
     trElement.id = id;

    return trElement;
}