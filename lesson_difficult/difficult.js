'use strict';

const week = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
let date = new Date();
let toDay = week[date.getDay() - 1];

for (let item of week) {
  if (item === 'суббота' || item === 'воскресенье') {
    console.log('%c%s', 'font-style: italic;', item);
  }
  else if (item === toDay) {
    console.log('%c%s', 'font-weight: bold;', toDay);
  } else {
    console.log(item);
  }
}