let money = 120000;
let income = '50000';
let addExpenses = 'Коммуналка, Интернет, Проезд, Питание, Развлечения';
let deposit = true;
let mission = 1000000;
let period = 12;
let budgetDay;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(', ');

console.log(addExpenses);

budgetDay = money / 30;

console.log(budgetDay);