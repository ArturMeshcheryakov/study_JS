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
    this.getExpInc();
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

  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      const itemValue = item.value.trim();

      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
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

  addExpInc(a) {
    let btn = a.target.className.split(' ')[1];
    btn = btn.split('_')[0];

    let items, plus;

    if (btn === 'income') {
      items = incomeItems;
      plus = incomeAdd;
    }

    if (btn === 'expenses') {
      items = expensesItems;
      plus = expensesAdd;
    }

    const cloneItem = items[0].cloneNode(true);
    items[0].parentNode.insertBefore(cloneItem, plus);
    items = document.querySelectorAll(`.${btn}-items`);

    const cloneItemInput = cloneItem.querySelectorAll('input');
    cloneItemInput.forEach((item) => {
      this.checkInput();
      item.value = '';
    });

    if (items.length === 3) {
      plus.style.display = 'none';
    }
  }

  getExpInc() {
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;

      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = +itemAmount;
      }
    };

    incomeItems.forEach(count);
    expensesItems.forEach(count);

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
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

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  changeRange = function () {
    document.querySelector('.period-amount').innerHTML = periodSelect.value;
    incomePeriodValue.value = this.calcPeriod();
  };

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


      depositPercent.addEventListener('input', function () {
        if (this.value !== '') {
          if (!isNumber(this.value) || (this.value < 1 || this.value > 100)) {
            this.value = '';
            alert("Введите корректное значение в поле проценты");
          }
        }
      });
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
      depositPercent.style.display = 'none';
      depositPercent.value = '';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
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

  eventsListeners() {
    this.checkStart();
    start.addEventListener('click', this.start.bind(this));
    expensesAdd.addEventListener('click', this.addExpInc.bind(this));
    incomeAdd.addEventListener('click', this.addExpInc.bind(this));
    periodSelect.addEventListener('input', this.changeRange.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    this.checkInput();
  }
}

const appData = new AppData();

appData.eventsListeners();
