let str = 'Lorem ipsum dolor sit amet, ' +
  'consectetur adipisicing elit. A aliquid cum cumque dicta laudantium maxime nostrum ' +
  'quasi reprehenderit repudiandae vero! Beatae debitis enim, ex facere minus nostrum ' +
  'nulla perferendis sit!';

let checkString = function (str) {
  if (typeof str === 'string') {
    str = str.trim();
    if(str.length > 30){
      str = str.slice(0, 30) + '...';
      console.log(str);
    }
  } else {
    console.log('Нужно ввести строку');
  }

  if (!str) {
    console.log('Данные не должны быть пустые');
  }
};

checkString(str);