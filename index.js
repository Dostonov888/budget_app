'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const start = document.getElementById('start'),
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

        additionalExpensesItem = document.querySelector('.additional_expenses-item'),
        targetAmount = document.querySelector('.target-amount'),

        periodAmount = document.querySelector('.period-amount'),
        depositBank = document.querySelector('.deposit-bank'),
        depositAmount = document.querySelector('.deposit-amount'),
        depositPercent = document.querySelector('.deposit-percent');


    let expensesItems = document.querySelectorAll('.expenses-items'),
        incomeItem = document.querySelectorAll('.income-items');


    class AppData {
        constructor() {
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
        }

        isNum(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        startOff() {

            if (salaryAmount.value === '') {
                start.disabled = true;
                start.style.background = '';
            } else {
                start.disabled = false;
                start.style.background = '#66CC66';
            }
        }
        start() {
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
            this.getExpInc();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getInfoDeposit();
            this.getBudget();
            this.showResult();
            this.getTargetMonth();
            this.addIncExpBlock();
        }



        showResult() {

            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(this.getTargetMonth());
            incomePeriodValue.value = this.calcIncomPer();



        }

        addIncExpBlock() {
            const count = item => {
                const myStr = item.className.split('-')[0];
                const inIt = item.querySelectorAll(`.${myStr}-items`).value;
                if (myStr.length === 3) {
                    `${myStr}Plus`.style.display = 'none';
                }

            };
            expensesItems.forEach(count);
            incomeItem.forEach(count);
        }
        getExpInc() {
            const count = item => {
                const startStr = item.className.split('-')[0];
                const itemTitle = item.querySelector(`.${startStr}-title`).value;
                const itemAmount = item.querySelector(`.${startStr}-amount`).value;
                if (itemTitle !== '' && itemAmount !== '') {
                    this[startStr][itemTitle] = itemAmount;
                }
            };
            incomeItem.forEach(count);
            expensesItems.forEach(count);
            for (const key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        }
        getAddExpenses() {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(item => {
                item = item.trim();
                if (item !== '') {
                    this.addExpenses.push(item);
                }
            }, this);
        }
        getAddIncome() {
            additionalIncomeItem.forEach(item => {
                let itemValue = item.value.trim();
                if (itemValue !== '') {
                    this.addIncome.push(itemValue);
                }
            }, this);
        }

        getExpensesMonth() {
            for (let key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }

        }

        getBudget() {
            const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
            this.budgetDay = Math.floor(this.budgetMonth / 30);
        }
        getTargetMonth() {
            return targetAmount.value / this.budgetMonth;
        }
        getStatusIncome() {
            if (this.budgetDay > 1200) {
                return ('У вас высокий уровень дохода');
            } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
                return ('У вас средний уровень дохода');
            } else if (this.budgetDay < 600 && this.budgetDay > 0) {
                return ('К сожалению у вас уровень дохода ниже среднего');
            } else if (this.budgetDay > 0 && this.budgetDay === 600 && this.budgetDay < 1200) {
                return ('К какому уровню не важно');
            }
        }

        eventFunc() {
            periodAmount.textContent = periodSelect.value;
        }
        calcIncomPer() {
            return this.budgetMonth * periodSelect.value;
        }
        reset() {
            let inputTextData = document.querySelectorAll('.data input[type = text]'),
                resultInputAll = document.querySelectorAll('.result input[type = text]');
            inputTextData.forEach(function (elem) {
                elem.value = '';
                elem.removeAttribute('disabled');
                periodSelect.value = '0';
                periodAmount.innerHTML = periodSelect.value;
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
            this.periodAmount = 1;

            cancel.style.display = 'none';
            start.style.display = 'block';
            expensesPlus.removeAttribute('disabled');
            incomePlus.removeAttribute('disabled');
            depositCheck.checked = false;
            depositPercent.style.display = 'none';
        }

        getInfoDeposit() {
            if (this.deposit) {
                this.percentDeposit = depositPercent.value;
                this.moneyDeposit = depositAmount.value;
                while (Number.isNaN(depositPercent.value) || depositPercent.value === null || depositPercent.value === '') {
                    alert("Введите корректное значение в поле проценты");
                    start.disabled = true;
                }

                while (Number.isNaN(depositAmount.value) || depositAmount.value === null || depositAmount.value === '') {
                    alert("Введите корректное значение в поле проценты");
                    start.disabled = true;
                }
            }
        }

        changePercent() {
            const valueSelect = this.value;

            if (valueSelect === 'other') {
                depositPercent.style.display = 'inline-block';
            } else {
                depositPercent.value = valueSelect;
                depositPercent.style.display = 'none';
            }
        }
        depositHandler() {
            if (depositCheck.checked) {
                depositBank.style.display = 'inline-block';
                depositAmount.style.display = 'inline-block';
                this.deposit = true;
                depositBank.addEventListener('change', this.changePercent);
            } else {
                depositBank.style.display = 'none';
                depositAmount.style.display = 'none';
                depositBank.value = '';
                depositAmount.value = '';
                this.deposit = false;
                depositBank.removeEventListener('change', this.changePercent);
            }
        }

        eventlisteners() {
            document.addEventListener('mouseover', this.startOff);
            start.addEventListener('click', this.start.bind(this));
            expensesPlus.addEventListener('click', this.addExpensesBlock);
            incomePlus.addEventListener('click', this.addIncomeBlock);
            periodSelect.addEventListener('input', this.eventFunc);
            cancel.addEventListener('click', this.reset.bind(this));
            periodSelect.addEventListener('mousemove', () => {
                incomePeriodValue.value = this.calcIncomPer();
            });
            depositCheck.addEventListener('change', this.depositHandler.bind(this));
        }
    }
    const newData = new AppData();
    newData.eventlisteners();


});
