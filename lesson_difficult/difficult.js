let num = 266219;
let multiplication = 1;
let result;

num = String(num);
num = num.split('');

for (let i = 0; i < num.length; i++) {
  multiplication *= +num[i];
}

result = multiplication;
result = result ** 3;
result = String(result);
result = +result.slice(0, 2);

console.log(result);

