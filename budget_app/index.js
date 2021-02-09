'use strict';

let startBtn = document.getElementById('start'),
    cancelBtn = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('.btn_plus'),
    chbox = document.querySelector('#deposit-check'),
    additionIncItem = document.querySelectorAll('#text'),//проверим

    budgetDay = document.getElementsByClassName('.budget_day-value'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
    incomePeriodValue = document.getElementsByClassName('income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-valuee'),

    budgetMonthValue = document.querySelector('.budget_month-value'),
    periodSelect = document.querySelector('.period-select'),
    targetAmount = document.querySelector('.target-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositAmount = document.querySelector('.deposit-amount'),

    additionalExpensesItem = document.querySelectorAlle('additional_expenses-item'),
    expensesAmount = document.querySelector('.expenses-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    incomeAmoun = document.querySelector('.income-amoun'),
    incomeTitl = document.querySelector('income-titl'),
    salaryAmount = document.querySelector('salary-amount');

