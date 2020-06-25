'use strict';

const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const incomeAdd = document.getElementsByTagName('button')[0];
const expensesAdd = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');

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
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');

let isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
  constructor() {
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
  }

  start() {
    this.checkStart();
    this.budget = +salaryAmount.value;
    this.replaceBtn();
    this.disabledInput();
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
  }

  checkStart() {
    if (salaryAmount.value === '') start.disabled = true;
    salaryAmount.addEventListener('input', function () {
      if (salaryAmount.value !== '') {
        start.disabled = false;
      } else {
        start.disabled = true;
      }
    });
  }

  replaceBtn() {
    start.style.display = 'none';
    cancel.style.display = 'block';
  }

  replaceBtn2() {
    start.style.display = 'block';
    cancel.style.display = 'none';
  }

  disabledInput() {
    const calcData = document.querySelector('.data');
    const calcDataInputAll = calcData.querySelectorAll('input');
    const calcDataButtonAll = calcData.querySelectorAll('button');

    calcDataInputAll.forEach(function (item) {
      if (item.type !== 'range') {
        item.disabled = true;
      }
    });

    calcDataButtonAll.forEach(function (item) {
      item.disabled = true;
    });
  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
  }

  expensesAdd() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');

    const cloneExpensesItemInput = cloneExpensesItem.querySelectorAll('input');
    cloneExpensesItemInput.forEach((item) => {
      this.checkInput();
      item.value = '';
    });

    if (expensesItems.length === 3) {
      expensesAdd.style.display = 'none';
    }
  }

  getExpenses() {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }

  incomeAdd() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');

    const cloneIncomeItemInput = cloneIncomeItem.querySelectorAll('input');
    cloneIncomeItemInput.forEach((item) => {
      this.checkInput();
      item.value = '';
    });

    if (incomeItems.length === 3) {
      incomeAdd.style.display = 'none';
    }
  }

  getIncome() {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach((item) => {
      item = item.trim();

      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();

      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth() {
    let result = 0;

    for (let key in this.expenses) {
      result += this.expenses[key];
    }

    this.expensesMonth = result;
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  getStatusIncome() {
    let budgetDay = this.budgetDay;

    if (budgetDay > 1200) return ('У вас высокий уровень дохода');
    else if (budgetDay > 600 && budgetDay < 1200) return ('У вас средний уровень дохода');
    else if (budgetDay < 0) return ('Что то пошло не так');
    else if (budgetDay === 0) return ('Ваш доход 0');
    else if (budgetDay < 600) return ('К сожалению у вас уровень дохода ниже среднего');
    else if (budgetDay === 1200) return ('Ваш доход 1200');
    else if (budgetDay === 600) return ('Ваш доход 600');
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  changeRange = function () {
    document.querySelector('.period-amount').innerHTML = periodSelect.value;
    incomePeriodValue.value = this.calcPeriod();
  }

  checkNumber(event) {
    if (event.charCode && (event.charCode < 48 || event.charCode > 57)) return false;
  }

  checkString(event) {
    let str = event.key;
    if (!str.replace(/[^а-яА-ЯёЁ.,():"'|;\-]/g, '')) return false;
  }

  checkInput() {
    document.querySelectorAll('input').forEach((item) => {
      if (item.getAttribute('placeholder') === 'Сумма') {
        item.onkeypress = this.checkNumber;
      }
      if (item.getAttribute('placeholder') === 'Наименование') {
        item.onkeypress = this.checkString;
      }
    });
  }

  addExpensesCase(data) {
    let arr = [];

    for (let i = 0; i < data.length; i++) {
      let str = data[i].trim();
      arr[i] = str[0].toUpperCase() + str.slice(1);
    }

    console.log(arr.join(', '));
  }

  reset() {
    const calc = document.querySelector('.calc');
    const calcInputAll = calc.querySelectorAll('input');
    const calcBtnAll = calc.querySelectorAll('button');

    calcInputAll.forEach((item) => {
      if (item.type === 'range') {
        item.value = 1;
        document.querySelector('.period-amount').innerHTML = '1';
      } else {
        item.value = '';
      }

      item.disabled = false;
    });

    calcBtnAll.forEach((item) => {
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

    depositCheck.checked = false;
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositBank.value = '';
    depositAmount.value = '';
    this.deposit = false;
    depositBank.removeEventListener('change', this.changePercent);

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
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.value = '';
      depositPercent.style.display = 'inline-block';

      depositPercent.onkeypress = function (event) {
        if (!event.key.replace(/[^0-9+]/, '') || this.value.length > 1) return false;
      };
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

  eventsListeners() {
    this.checkStart();
    start.addEventListener('click', this.start.bind(this));
    expensesAdd.addEventListener('click', this.expensesAdd.bind(this));
    incomeAdd.addEventListener('click', this.incomeAdd.bind(this));
    periodSelect.addEventListener('input', this.changeRange.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    this.checkInput();
  }
}

const appData = new AppData();

appData.eventsListeners();




