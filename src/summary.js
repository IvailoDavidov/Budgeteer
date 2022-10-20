import { getCategory, getData, getMonth } from "./utils.js";

let expensesData = getData();
let budgetData = getData(2);

const tHead = document.querySelector('.editor thead');
const tBody = document.querySelector('.editor tbody');
const tFoot = document.querySelector('.editor tfoot');

let expenses = Array.from(expensesData.values());
let budget = Array.from(budgetData.values());

let budgetDates = [];
let sortedInfo = new Map();

budget.forEach(element => {
    budgetDates.push(element.date);
});

console.log(expenses);

for (let i = 0; i < budgetDates.length; i++) {
    let month = budgetDates[i].slice(0, 3);

    for (let j = 0; j < expenses.length; j++) {
        let record = expenses[j];
        let currMonth = expenses[j].date.slice(5, 7);
        let currCategory = record.category;

        if (month == getMonth(currMonth)) {
            if (!sortedInfo.has(month)) {
                sortedInfo.set(month, new Map().set(currCategory, new Array()))

                if (!sortedInfo.get(month).has(currCategory)) {
                    sortedInfo.get(month).set(currCategory, new Array());
                    sortedInfo.get(month).get(currCategory).push(record.amount);
                } else {
                    sortedInfo.get(month).get(currCategory).push(record.amount);
                }
            }
            else if (sortedInfo.has(month)) {
                if (!sortedInfo.get(month).has(currCategory)) {
                    sortedInfo.get(month).set(currCategory, new Array());
                    sortedInfo.get(month).get(currCategory).push(record.amount);
                } else {
                    sortedInfo.get(month).get(currCategory).push(record.amount);
                }
            }
        }
    }
}

createTHead(sortedInfo);
createTBody(sortedInfo); //TODO: 

function createTBody(dataMap) {
    //TODO: 
    let mapValues = Array.from(dataMap.values()); 
    debugger;
    let categoryNum = Array.from(mapValues.keys());
    let categoryAmounts = Array.from(mapValues.values())

    //console.log(categoryNum);
    console.log(categoryAmounts);

    for (let i = 0; i < categoryAmounts.length; i++) {
        let totalAmount = 0;

        categoryAmounts[i].forEach(arr => {
            if (arr.length > 1) {
                totalAmount += arr.reduce((a, b) => Number(a) + Number(b));
            } else {
                totalAmount += Number(arr[0]);
            }
        })

        let tr = document.createElement('tr');
        tr.innerHTML =
            `<tr>
            <th>Utilities</th>
            <td><span class="currency">${totalAmount}</span></td>
            <td><span class="currency">410</span></td>
            <td><span class="currency">360</span></td>
            <th><span class="currency">1150</span></th>
        </tr>`
    }

    for (const categories of mapValues.values()) {
        debugger;


        // })
        //     let tr = document.createElement('tr');
        //     tr.innerHTML = 
        //     `<tr>
        //     <th>${categories}</th>
        //     <td><span class="currency">380</span></td>
        //     <td><span class="currency">410</span></td>
        //     <td><span class="currency">360</span></td>
        //     <th><span class="currency">1150</span></th>
        // </tr>`
        // }

    }
    //console.log(totalAmount);

}
function createTHead(dataMap) {
    let months = Array.from(dataMap.keys());

    let tr = document.createElement('tr');
    tr.innerHTML =
        `<tr>
   <th>Category</th>
   <th>${months[0]}</th>
   <th>${months[1]}</th>
   <th>${months[2]}</th>
   <th>Total</th>
</tr>`
    tHead.replaceChildren(tr);
}

//console.log(sortedInfo)