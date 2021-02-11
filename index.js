'use strict';

let startBtn = document.getElementById('start'),
    cancelBtn = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button')[0],
    expensesAdd = document.getElementsByTagName('button')[1],
    checkbox = document.querySelector('#deposit-check'),
    additionIncItem = document.querySelectorAll('.additional_income-item'),

    budgetDay = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],

    budgetMonthValue = document.querySelector('.budget_month-value'),
    periodSelect = document.querySelector('.period-select'),
    targetAmount = document.querySelector('.target-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositAmount = document.querySelector('.deposit-amount'),

    additionalExpensesItem = document.getElementsByClassName('additional_expenses-item')[0],
    expensesAmount = document.getElementsByClassName('expenses-amount')[0],
    expensesTitle = document.getElementsByClassName('expenses-title')[1],

    incomeAmount = document.getElementsByClassName('income-amount')[0],
    incomeTitle = document.getElementsByClassName('income-title')[1],
    salaryAmount = document.getElementsByClassName('salary-amount')[0];
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money; // доход за месец,число

let start = function () {
    do {
        money = prompt('Ваш месячный доход?', 50000);
    }
    while (!isNumber(money));
};
start();

const appData = {
    budget: +money,
    budgetDay: 0,// дневной бюджет
    budgetMonth: 0,//бюджет на месяц
    income: {}, //,//с дополнительными доходом (фрелансер),строка
    addIncome: [],// доп доходы
    expensesMonth: 0,//сумму всех обязательных расходов за месяц
    expenses: {}, //дополнительный расходы
    addExpenses: [],//массив возможными расходы
    deposit: false,// любое булево значение
    parcentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000,//любое число (Какую сумму хотите накопить)
    period: 6,//число от 1 до 12 (месяцев)
    asking: function () {

        if (confirm('Есть ли у вас дополнительный источник зароботка?')) {
            let itemIncome = prompt('Какой у вас дополнительный зароботок?', 'Таксует');
            while (typeof (itemIncome) !== 'string' || typeof (itemIncome) === null || itemIncome === '') {
                itemIncome = prompt('Какой у вас дополнительный зароботок?', 'Таксует');
            }
            let cashIncome = +prompt('Cколько в месяц вы на этом зароботаваете?', 10000);
            while (typeof (cashIncome) === 'string' || cashIncome === null || cashIncome === '') {
                cashIncome = +prompt('Cколько в месяц вы на этом зароботаваете?', 10000);
            }
            appData.income[itemIncome] = +cashIncome;
        }

        //typeof (items) === 'string' && typeof (items) != null && items != '')
        let addExpenses = prompt('Перечилите возможные расходы через запятую!', 'кино, театр, учеба');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        while (typeof (addExpenses) !== 'string' || typeof (addExpenses) === null || addExpenses === '') {
            let addExpenses = prompt('Перечилите возможные расходы через запятую!', 'кино, театр, учеба');
        }
        this.addExpenses = this.addExpenses.map(item => item.toLowerCase().trim().slice(0, 1).toUpperCase() + item.slice(1));
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let expenses = prompt('Введите обязательную статью расходов');
            while (typeof (expenses) !== "string" || typeof (expenses) === null || expenses === '') {
                expenses = prompt('Пожалуйста введите строку');
            }
            console.log(expenses);
            let answer;
            do {
                answer = prompt('Во сколько это обойдется?', 1000);
            }
            while (!isNumber(answer));


            appData.expenses[expenses.toString().toLowerCase().split(', ')] = +answer;

        }

    },

    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
        return appData.expensesMonth;

    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },


    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.budgetMonth);
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
    getInfoDeposit: function () {
        if (appData.deposit) {
            // appData.parcentDeposit = +prompt('Какой годовой процент?', '18');
            // appData.moneyDeposit = +prompt('Какая сумма заложена?', 10000);

            let answer2;
            do {
                answer2 = +prompt('Какой годовой процент?', '18');
            }
            while (typeof (answer2) === 'string' || typeof (answer2) === null || typeof (answer2) === '');
            let answer3;
            do {
                answer3 = +prompt('Какая сумма заложена?', 10000);
            }
            while (typeof (answer3) === 'string' || typeof (answer2) === null || typeof (answer2) === '');


            appData.parcentDeposit[answer2.toString().toLowerCase().split(', ')] = +answer2;
            appData.parcentDeposit[answer3.toString().toLowerCase().split(', ')] = +answer3;
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
    }

};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSavedMoney();


console.log('Расходы на месец: ' + appData.expensesMonth);
if (appData.period > 0) {
    console.log('Цель будет достигнута за ' + Math.floor(appData.period) + ' месяцев(-а)');
} else {
    console.log('Цель не будет достигнута');
}

for (let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}
console.log(appData.parcentDeposit);
console.log(appData.addExpenses.join(', '));
