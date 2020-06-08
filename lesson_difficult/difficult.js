//1
let lang = prompt('Введите ru или en', 'ru');
let dayWeekRu = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
let dayWeekEn = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let dayWeekArray = [[lang], dayWeekRu, dayWeekEn];

//a
if (lang === 'ru') console.log(dayWeekRu);
else if (lang === 'en') console.log(dayWeekEn);

//b
switch (lang) {
  case 'ru':
    console.log(dayWeekRu);
    break;
  case 'en':
    console.log(dayWeekEn);
}

//c
dayWeekArray = (dayWeekArray[0][0] === 'ru') ? console.log(dayWeekArray[1]) : (dayWeekArray[0][0] === 'en') ? console.log(dayWeekArray[2]) : console.log('Что-то не то');


//2
let namePerson = prompt('What`s your name?', '');

namePerson = (namePerson === 'Артем') ? console.log('директор')
  : (namePerson === 'Максим') ? console.log('преподаватель')
    : console.log('студент');