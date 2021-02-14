'use strict';

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('.budget_month-value'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    //incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    // depositPercent = document.querySelector('.deposit-percent'),
    // depositAmount = document.querySelector('.deposit-amount'),
    periodAmount = document.querySelector('.period-amount');

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};




let appData = {
    budget: 0,
    budgetDay: 0,// дневной бюджет
    budgetMonth: 0,//бюджет на месяц
    income: {}, //,//с дополнительными доходом (фрелансер),строка
    incomeMonth: 0,
    addIncome: [],// доп доходы
    expensesMonth: 0,//сумму всех обязательных расходов за месяц
    expenses: {}, //дополнительный расходы
    addExpenses: [],//массив возможными расходы
    deposit: false,// любое булево значение
    parcentDeposit: 0,
    moneyDeposit: 0,

    start: function () {
        if (salaryAmount.value === '') {
            start.removeAttribute('disabled');
        }
        appData.budget = +salaryAmount.value;


        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();

        appData.getTargetMonth();
        appData.getInfoDeposit();
        appData.eventFunc();
        appData.calcIncomPer();
    },
    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.eventFunc();
        periodAmount.value = appData.calcIncomPer();
    },

    addExpensesBlock: function () {

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }

        });
    },

    getIncome: function () {
        incomeItem.forEach(function (item) {
            let itemIncome = confirm('Есть ли у вас дополнительный источник зароботка?').value;
            let cashIncome = prompt('Какой у вас дополнительный зароботок?', 'Таксует').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.addIncome[itemIncome] = cashIncome;
            }
        });


        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    //getIncome


    getInfoDeposit: function () {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        if (appData.deposit) {
            let answer2;
            do {
                answer2 = prompt('Какой годовой процент?', '18');
            }
            while (Number.isNaN(answer2) || answer2 === null || answer2 === '');
            let answer3;
            do {
                answer3 = prompt('Какая сумма заложена?', 10000);
            }
            while (Number.isNaN(answer3) || answer3 === null || answer3 === '');
            appData.parcentDeposit = +answer2;
            appData.moneyDeposit = +answer3;

        }
    },



    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
        return appData.expensesMonth;

    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },


    getTargetMonth: function () {
        return targetMonthValue.value / appData.budgetMonth;
    },

    getStatusIncome: function () {
        if (appData.budgetDay > 1200) {
            console.log('У вас высокий уровень дохода');
        } else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
            console.log('К сожалению у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay > 0 && appData.budgetDay === 600 && appData.budgetDay < 1200) {
            console.log('К какому уровню не важно');
        }
    },

    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },
    eventFunc: function (event) {
        return periodAmount.innerHTML = event.target.value;
    },
    calcIncomPer: function (event) {
        return periodSelect.value * appData.budgetMonth;
    }



};
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.eventFunc);
periodSelect.addEventListener('onchange', appData.calcIncomPer);



// for (let i = 0; i < 2; i++) {
//     let expenses;
//     do {
//         expenses = prompt('Введите обязательную статью расходов');
//     }
//     while
//         (isNumber(expenses) || expenses === null || expenses.trim() === '');

//     let answer;
//     do {
//         answer = prompt('Во сколько это обойдется?', 1000);
//     }
//     while (!isNumber(answer));
//     appData.expenses[expenses.toString().toLowerCase().split(', ')] = +answer;
// }


// let addExpenses;
// do {
//     addExpenses = prompt('Перечилите возможные расходы через запятую!', 'кино, театр, учеба');
// }
// while
//     (typeof (addExpenses) !== 'string' || a addExpenses === '' || isNumber(addExpenses));

// appData.addExpenses = addExpenses.toLowerCase().trim().slice();






