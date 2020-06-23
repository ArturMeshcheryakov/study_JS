'use strict';

const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
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

const AppData = function () {
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;
};

AppData.prototype.start = function () {
  this.checkStart();
  this.budget = +salaryAmount.value;
  this.replaceBtn();
  this.disabledInput();
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
};
AppData.prototype.checkStart = function () {
  if (salaryAmount.value === '') start.disabled = true;
  salaryAmount.addEventListener('input', function () {
    if (salaryAmount.value !== '') {
      start.disabled = false;
    } else {
      start.disabled = true;
    }
  });
};
AppData.prototype.replaceBtn = function () {
  start.style.display = 'none';
  cancel.style.display = 'block';
};
AppData.prototype.replaceBtn2 = function () {
  start.style.display = 'block';
  cancel.style.display = 'none';
};
AppData.prototype.disabledInput = function () {
  let calcData = document.querySelector('.data');
  let calcDataInputAll = calcData.querySelectorAll('input');
  let calcDataButtonAll = calcData.querySelectorAll('button');

  calcDataInputAll.forEach(function (item) {
    if (item.type !== 'range') {
      item.disabled = true;
    }
  });

  calcDataButtonAll.forEach(function (item) {
    item.disabled = true;
  });
};
AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();
};
AppData.prototype.expensesAdd = function () {
  let thisMy = this;

  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
  expensesItems = document.querySelectorAll('.expenses-items');

  let cloneExpensesItemInput = cloneExpensesItem.querySelectorAll('input');
  cloneExpensesItemInput.forEach(function (item) {
    thisMy.checkInput();
    item.value = '';
  });

  if (expensesItems.length === 3) {
    expensesAdd.style.display = 'none';
  }
};
AppData.prototype.getExpenses = function () {
  let thisMy = this;

  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;

    if (itemExpenses !== '' && cashExpenses !== '') {
      thisMy.expenses[itemExpenses] = +cashExpenses;
    }
  });
};
AppData.prototype.incomeAdd = function () {
  let thisMy = this;
  let cloneIncomeItem = incomeItems[0].cloneNode(true);

  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
  incomeItems = document.querySelectorAll('.income-items');

  let cloneIncomeItemInput = cloneIncomeItem.querySelectorAll('input');
  cloneIncomeItemInput.forEach(function (item) {
    thisMy.checkInput();
    item.value = '';
  });

  if (incomeItems.length === 3) {
    incomeAdd.style.display = 'none';
  }
};
AppData.prototype.getIncome = function () {
  let thisMy = this;

  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;

    if (itemIncome !== '' && cashIncome !== '') {
      thisMy.income[itemIncome] = +cashIncome;
    }
  });

  for (let key in thisMy.income) {
    thisMy.incomeMonth += +thisMy.income[key];
  }
};
AppData.prototype.getAddExpenses = function () {
  let thisMy = this;
  let addExpenses = additionalExpensesItem.value.split(',');

  addExpenses.forEach(function (item) {
    item = item.trim();

    if (item !== '') {
      thisMy.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  let thisMy = this;

  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();

    if (itemValue !== '') {
      thisMy.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
  let result = 0;

  for (let key in this.expenses) {
    result += this.expenses[key];
  }

  this.expensesMonth = result;
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
  return Math.ceil(targetAmount.value / this.budgetMonth);
};
AppData.prototype.getStatusIncome = function () {
  let budgetDay = this.budgetDay;

  if (budgetDay > 1200) return ('У вас высокий уровень дохода');
  else if (budgetDay > 600 && budgetDay < 1200) return ('У вас средний уровень дохода');
  else if (budgetDay < 0) return ('Что то пошло не так');
  else if (budgetDay === 0) return ('Ваш доход 0');
  else if (budgetDay < 600) return ('К сожалению у вас уровень дохода ниже среднего');
  else if (budgetDay === 1200) return ('Ваш доход 1200');
  else if (budgetDay === 600) return ('Ваш доход 600');
};
AppData.prototype.getInfoDeposit = function () {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент?', '10');
      if (isNumber(this.percentDeposit)) {
        do {
          this.moneyDeposit = prompt('Какая сумма заложена?', 10000);

          if (!isNumber(this.moneyDeposit)) {
            alert('Такое значение не подойдет');
          }
        } while (!isNumber(this.moneyDeposit));
      } else {
        alert('Такое значение не подойдет');
      }
    } while (!isNumber(this.percentDeposit));


  }
};
AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.changeRange = function () {
  document.querySelector('.period-amount').innerHTML = periodSelect.value;
  incomePeriodValue.value = this.calcPeriod();
};
AppData.prototype.checkNumber = function (event) {
  if (event.charCode && (event.charCode < 48 || event.charCode > 57)) return false;
};
AppData.prototype.checkString = function (event) {
  let str = event.key;
  if (!str.replace(/[^а-яА-ЯёЁ.,():"'|;\-]/g, '')) return false;
};
AppData.prototype.checkInput = function () {
  let thisMy = this;

  document.querySelectorAll('input').forEach(function (item) {
    if (item.getAttribute('placeholder') === 'Сумма') {
      item.onkeypress = thisMy.checkNumber;
    }
    if (item.getAttribute('placeholder') === 'Наименование') {
      item.onkeypress = thisMy.checkString;
    }
  });
};
AppData.prototype.addExpensesCase = function (data) {
  let arr = [];

  for (let i = 0; i < data.length; i++) {
    let str = data[i].trim();
    arr[i] = str[0].toUpperCase() + str.slice(1);
  }

  console.log(arr.join(', '));
};
AppData.prototype.reset = function () {
  let calc = document.querySelector('.calc');
  let calcInputAll = calc.querySelectorAll('input');
  let calcBtnAll = calc.querySelectorAll('button');

  calcInputAll.forEach(function (item) {
    if (item.type === 'range') {
      item.value = 1;
      document.querySelector('.period-amount').innerHTML = 1;
    } else {
      item.value = '';
    }

    item.disabled = false;
  });

  calcBtnAll.forEach(function (item) {
    item.disabled = false;
  });

  for (let i = 0; i < incomeItems.length; i++) {
    if (i !== 0) incomeItems[i].remove();
  }

  for (let i = 0; i < expensesItems.length; i++) {
    if (i !== 0) expensesItems[i].remove();
  }

  if (incomeItems.length === 3) {
    incomeAdd.style.display = 'block';
  }

  if (expensesItems.length === 3) {
    expensesAdd.style.display = 'block';
  }

  this.replaceBtn2();
  this.checkStart();

  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.incomeMonth = 0;
};
AppData.prototype.eventsListeners = function () {
  this.checkStart();
  start.addEventListener('click', this.start.bind(this));
  expensesAdd.addEventListener('click', this.expensesAdd.bind(this));
  incomeAdd.addEventListener('click', this.incomeAdd.bind(this));
  periodSelect.addEventListener('input', this.changeRange.bind(this));
  cancel.addEventListener('click', this.reset.bind(this));
  this.checkInput();
};

const appData = new AppData();

appData.eventsListeners();




