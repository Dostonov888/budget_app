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
