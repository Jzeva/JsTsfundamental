function testVarLetConst() {
  var a = 1;
  let b = 2;
  const c = 3;

  if (true) {
    var a = 10; // 重新声明，影响函数作用域
    let b = 20; // 块级作用域
    const c = 30;
    console.log("Inside block:", a, b, c);
  }

  console.log("Outside block:", a, b, c);
}

testVarLetConst();

console.log(typeof "hello"); // string
console.log(typeof 123); // number
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof null); // object ← 特殊点
console.log(typeof {}); // object
console.log(typeof []); // object
console.log(typeof function () {}); // function

// Primitive
let x = 10;
let y = x;
y = 20;
console.log(x, y); // 10, 20

// Reference
let obj1 = { a: 1 };
let obj2 = obj1;
obj2.a = 999;
console.log(obj1.a); // 999

// 判断变量是否为数组
function isArray(value: any) {
  return Array.isArray(value);
}

// 判断 null、undefined、对象、函数
function typeOfValue(val: any) {
  if (val === null) return "null";
  if (Array.isArray(val)) return "array";
  return typeof val;
}

console.log(typeOfValue(null)); // "null"
console.log(typeOfValue([1, 2, 3])); // "array"
console.log(typeOfValue(() => {})); // "function"
console.log(typeOfValue({ name: "J" })); // "object"
