'use strict';
let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.querySelector('.budget_month-value'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');
let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    budget: 0,
    budgetDay: 0,// дневной бюджет
    budgetMonth: 0,//бюджет на месяц
    income: {}, //с дополнительными доходом (фрелансер),строка
    incomeMonth: 0,
    addIncome: [],// доп доходы
    expensesMonth: 0,//сумму всех обязательных расходов за месяц
    expenses: {}, //дополнительный расходы
    addExpenses: [],//массив возможными расходы
    deposit: false,// любое булево значение
    parcentDeposit: 0,
    moneyDeposit: 0,



    startOff: function () {
        if (salaryAmount.value === '') {
            start.disabled = true;
            start.style.background = '';
        } else {
            start.disabled = false;
            start.style.background = '#66CC66';
        }
    },

    start: function () {
        if (salaryAmount.value === '') {
            start.setAttribute('disabled', 'true');
            return;
        }
        let allInput = document.querySelectorAll('.data input[type = text]');
        allInput.forEach(function (item) {
            item.setAttribute('disabled', 'true');
        });
        if (incomeItem.value === '') {
            incomePlus.setAttribute('disabled', 'true');
            return;
        }
        if (expensesItems.value === '') {
            expensesPlus.setAttribute('disabled', 'true');
            return;
        }

        start.style.display = 'none';
        cancel.style.display = 'block';
        this.expenses = {};
        this.addExpenses = [];
        this.expensesMonth = 0;
        this.budget = +salaryAmount.value;
        this.incomeMonth = 0;
        this.addIncome = [];
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
        this.getTargetMonth();

    },

    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = appData.calcIncomPer();
        periodSelect.addEventListener('mousemove', function () {
            incomePeriodValue.value = appData.calcIncomPer();
        });

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
        const _this = this;
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }

        });
    },
    getIncome: function () {
        const _this = this;
        incomeItem.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }

        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }


    },
    getAddExpenses: function () {
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        const _this = this;
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    },
    getInfoDeposit: function () {
        if (this.depositCheck.checked) {
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
            this.parcentDeposit = +answer2;
            this.moneyDeposit = +answer3;
        }
    },
    getExpensesMonth: function () {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }

    },

    getBudget: function () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return targetAmount.value / this.budgetMonth;
    },
    getStatusIncome: function () {
        if (this.budgetDay > 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay > 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (this.budgetDay > 0 && this.budgetDay === 600 && this.budgetDay < 1200) {
            return ('К какому уровню не важно');
        }
    },

    eventFunc: function () {
        periodAmount.textContent = periodSelect.value;
    },
    calcIncomPer: function () {
        return this.budgetMonth * periodSelect.value;
    },

    reset: function () {
        let inputTextData = document.querySelectorAll('.data input[type = text]'),
            resultInputAll = document.querySelectorAll('.result input[type = text]');
        inputTextData.forEach(function (elem) {
            elem.value = '';
            elem.removeAttribute('disabled');
            periodSelect.value = '0';
            periodSelect.innerHTML = periodSelect.value;
        });
        resultInputAll.forEach(function (elem) {
            elem.value = '';

        });
        for (let i = 1; i < incomeItem.length; i++) {
            incomeItem[i].parentNode.removeChild(incomeItem[i]);
            incomePlus.style.display = 'block';
        }
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
            expensesPlus.style.display = 'block';
        }
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expensesMonth = 0;
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.parcentDeposit = 0;
        this.moneyDeposit = 0;


        cancel.style.display = 'none';
        start.style.display = 'block';
        expensesPlus.removeAttribute('disabled');
        incomePlus.removeAttribute('disabled');
        depositCheck.checked = false;
    },


};

document.addEventListener('mouseover', appData.startOff);
start.addEventListener('click', appData.start.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.eventFunc);
cancel.addEventListener('click', appData.reset.bind(appData));

