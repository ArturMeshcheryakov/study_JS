'use strict';

const start = document.getElementById('start');
const incomeAdd = document.getElementsByTagName('button')[0];
const expensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
  start: function () {
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();
  },
  expensesAdd: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  incomeAdd: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomeAdd.style.display = 'none';
    }
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
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
  getExpensesMonth: function () {
    let result = 0;

    for (let key in appData.expenses) {
      result += appData.expenses[key];
    }

    appData.expensesMonth = result;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / appData.budgetMonth);
  },
  getStatusIncome: function () {
    let budgetDay = appData.budgetDay;

    if (budgetDay > 1200) return ('У вас высокий уровень дохода');
    else if (budgetDay > 600 && budgetDay < 1200) return ('У вас средний уровень дохода');
    else if (budgetDay < 0) return ('Что то пошло не так');
    else if (budgetDay === 0) return ('Ваш доход 0');
    else if (budgetDay < 600) return ('К сожалению у вас уровень дохода ниже среднего');
    else if (budgetDay === 1200) return ('Ваш доход 1200');
    else if (budgetDay === 600) return ('Ваш доход 600');
  },
  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
        if (isNumber(appData.percentDeposit)) {
          do {
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);

            if (!isNumber(appData.moneyDeposit)) {
              alert('Такое значение не подойдет');
            }
          } while (!isNumber(appData.moneyDeposit));
        } else {
          alert('Такое значение не подойдет');
        }
      } while (!isNumber(appData.percentDeposit));


    }
  },
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  },
  changeRange: function () {
    document.querySelector('.period-amount').innerHTML = periodSelect.value;
    incomePeriodValue.value = appData.calcPeriod();
  },
  addExpensesCase: function (data) {
    let arr = [];

    for (let i = 0; i < data.length; i++) {
      let str = data[i].trim();
      arr[i] = str[0].toUpperCase() + str.slice(1);
    }

    console.log(arr.join(', '));
  }
};

if (salaryAmount.value === '') start.disabled = true;
salaryAmount.addEventListener('input', function () {
  if (salaryAmount.value !== '') {
    start.disabled = false;
  } else {
    start.disabled = true;
  }
});
start.addEventListener('click', appData.start);
expensesAdd.addEventListener('click', appData.expensesAdd);
incomeAdd.addEventListener('click', appData.incomeAdd);
periodSelect.addEventListener('input', appData.changeRange);

// console.log(appData.getStatusIncome());
