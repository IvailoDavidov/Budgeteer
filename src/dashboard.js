import { getCategory, getData } from "./utils.js";

let storageRecords = getData();

const divArea = document.querySelector('.breakdown');
divArea.innerHTML = '';

let objectRecords = getRecordsObject(storageRecords);
generateGraph(objectRecords);

function getRecordsObject(mapRecords) {
    let obj = {};
    let recordValues = Array.from(mapRecords.values());

    recordValues.forEach(element => {
        let categoryId = element.category;
        if (!obj.hasOwnProperty(categoryId)) {
            obj[categoryId] = [];
        }
        obj[categoryId].push(element.amount)
    });
    return obj;
}

function generateGraph(records) {
   let maxWidth = 500;
    for (let category in records) {
        let currAmount = 0;
        if (records[category].length > 1) {
            currAmount = records[category].reduce((a, b) => Number(a) + Number(b));
        } else {
            currAmount = Number(records[category]);
        }

        let row = createRow(currAmount, category, maxWidth);
        divArea.appendChild(row);
    }
}

function createRow(amount,category,maxWidth) {
    let divElement = document.createElement('div');
    divElement.innerHTML =
        `<div class="cat-row">
<span class="row label">${getCategory(category)}</span>
<span class="row value">${amount}</span>
<div class="bar-area">
<span class="bar" style="width: ${(amount/maxWidth * 250)}px"></span>
</div>
</div>`

    return divElement;
}








