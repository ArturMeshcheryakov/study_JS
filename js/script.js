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
  },
  checkStart: function () {
    if (salaryAmount.value === '') start.disabled = true;
    salaryAmount.addEventListener('input', function () {
      if (salaryAmount.value !== '') {
        start.disabled = false;
      } else {
        start.disabled = true;
      }
    });
  },
  replaceBtn: function () {
    start.style.display = 'none';
    cancel.style.display = 'block';
  },
  replaceBtn2: function () {
    start.style.display = 'block';
    cancel.style.display = 'none';
  },
  disabledInput: function () {
    let calcData = document.querySelector('.data');
    let calcDataInputAll = calcData.querySelectorAll('input');
    let calcDataButtonAll = calcData.querySelectorAll('button');

    calcDataInputAll.forEach(function (item) {
      item.disabled = true;
    });

    calcDataButtonAll.forEach(function (item) {
      item.disabled = true;
    });
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
  },
  expensesAdd: function () {
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
  },
  getExpenses: function () {
    let thisMy = this;

    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        thisMy.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  incomeAdd: function () {
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
  },
  getIncome: function () {
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
  },
  getAddExpenses: function () {
    let thisMy = this;
    let addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach(function (item) {
      item = item.trim();

      if (item !== '') {
        thisMy.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    let thisMy = this;

    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();

      if (itemValue !== '') {
        thisMy.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    let result = 0;

    for (let key in this.expenses) {
      result += this.expenses[key];
    }

    this.expensesMonth = result;
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function () {
    let budgetDay = this.budgetDay;

    if (budgetDay > 1200) return ('У вас высокий уровень дохода');
    else if (budgetDay > 600 && budgetDay < 1200) return ('У вас средний уровень дохода');
    else if (budgetDay < 0) return ('Что то пошло не так');
    else if (budgetDay === 0) return ('Ваш доход 0');
    else if (budgetDay < 600) return ('К сожалению у вас уровень дохода ниже среднего');
    else if (budgetDay === 1200) return ('Ваш доход 1200');
    else if (budgetDay === 600) return ('Ваш доход 600');
  },
  getInfoDeposit: function () {
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
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
  changeRange: function () {
    document.querySelector('.period-amount').innerHTML = periodSelect.value;
    incomePeriodValue.value = this.calcPeriod();
  },
  checkNumber: function (event) {
    if (event.charCode && (event.charCode < 48 || event.charCode > 57)) return false;
  },
  checkString: function (event) {
    let str = event.key;
    if (!str.replace(/[^а-яА-ЯёЁ.,():"'|;\-]/g, '')) return false;
  },
  checkInput: function () {
    let thisMy = this;

    document.querySelectorAll('input').forEach(function (item) {
      if (item.getAttribute('placeholder') === 'Сумма') {
        item.onkeypress = thisMy.checkNumber;
      }
      if (item.getAttribute('placeholder') === 'Наименование') {
        item.onkeypress = thisMy.checkString;
      }
    });
  },
  addExpensesCase: function (data) {
    let arr = [];

    for (let i = 0; i < data.length; i++) {
      let str = data[i].trim();
      arr[i] = str[0].toUpperCase() + str.slice(1);
    }

    console.log(arr.join(', '));
  },
  reset: function () {
    let calc = document.querySelector('.calc');
    let calcInputAll = calc.querySelectorAll('input');
    let calcBtnAll = calc.querySelectorAll('input');

    calcInputAll.forEach(function (item) {

      if(item.type === 'range'){
        item.value = 1;
      }else{
        item.value = '';
      }

      item.disabled = false;
    });

    calcBtnAll.forEach(function (item) {
      item.disabled = false;
    });

    this.replaceBtn2();
    this.checkStart();
  }
};
appData.checkStart();
start.addEventListener('click', appData.start.bind(appData));
expensesAdd.addEventListener('click', appData.expensesAdd.bind(appData));
incomeAdd.addEventListener('click', appData.incomeAdd.bind(appData));
periodSelect.addEventListener('input', appData.changeRange.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));
appData.checkInput();
