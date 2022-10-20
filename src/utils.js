function getParsedDate(date) {

    const months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    }

    let parsedDate = new Date(date);
    let month = parsedDate.getMonth();

    return `${parsedDate.getDate()}.${months[month]}`;
}
function getParsedYearMonth(date) {
    const day = '01';

    let dateInfo = date.split('-');
    let montInput = dateInfo[0];
    let yearInput = dateInfo[1];

    let newDate = `${montInput}-${day}-${yearInput}`;

    const months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    }

    let parsedDate = new Date(newDate);
    let month = parsedDate.getMonth();

    return `${months[month]}-${parsedDate.getFullYear()}`;

}

function getMonth(num) {

    const months = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec'
    }
    return months[num];
}

function getCategory(num) {

    const categories = {
        0: 'Others',
        1: 'Utilities',
        2: 'Groceries',
        3: 'Entertainment',
        4: 'Transport'
    }

    return categories[num];
}

function generateId() {
    return (Math.floor(Math.random() * (99999999 - 11111111))).toString(16);
}

function setData(data) {
    let counter = 2;
    let hasAmount = false;
    let records = Array.from(data.values());
    debugger;

    for (let i = 0; i < records.length; i++) {

        if (records[i].hasOwnProperty('amount')) {
            hasAmount = true;
            break;
        }
    }

    if (hasAmount) {
        localStorage.setItem('records', JSON.stringify(records));
    } else {

        localStorage.setItem('records' + `${counter}`, JSON.stringify(records));
    }

}
function getData(num) {
    let records;

    if (num != undefined) {
        records = JSON.parse(localStorage.getItem('records' + `${num}`));

    } else {
        records = JSON.parse(localStorage.getItem('records'));
    }
    return new Map(records.map(e => [e.id, e]));
}


export {
    getParsedDate,
    getCategory,
    generateId,
    setData,
    getData,
    getParsedYearMonth,
    getMonth,
}