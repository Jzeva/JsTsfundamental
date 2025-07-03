// ✅ Scope Chain & `this` 指向练习题（含答案）

// ------------------------
// Q1. Scope chain 静态绑定（定义位置决定）
// ------------------------
const x = "global";

function outer() {
  const x = "outer";

  function inner() {
    console.log("Q1:", x); // ✅ 输出：outer（作用域链从定义位置决定）
  }

  return inner;
}

const fn = outer();
fn(); // ✅ outer

// ------------------------
// Q2. 调用位置不影响作用域链
// ------------------------
const message = "global";

function createPrinter() {
  const message = "local";
  return function () {
    console.log("Q2:", message); // ✅ 输出：local
  };
}

const printer = createPrinter();
const message2 = "another"; // 与作用域链无关
printer(); // ✅ local

// ------------------------
// Q3. 普通函数 vs 箭头函数的 this
// ------------------------
const person = {
  name: "Alice",
  sayHi: function () {
    console.log("Q3 Traditional:", this.name); // ✅ this 指向 person
  },
  sayHiArrow: () => {
    console.log("Q3 Arrow:", (this as any)?.name); // ❌ this 是 globalThis，name likely undefined
  },
};

person.sayHi(); // ✅ Alice
person.sayHiArrow(); // ❌ undefined（箭头函数无 this）

// ------------------------
// Q4. this + setTimeout + 箭头函数
// ------------------------
const counter = {
  count: 0,
  start: function () {
    setTimeout(function () {
      console.log("Q4 Normal:", this.count); // ❌ undefined（this = globalThis）
    }, 100);

    setTimeout(() => {
      console.log("Q4 Arrow:", this.count); // ✅ 0（箭头函数继承外层 this）
    }, 200);
  },
};

counter.start();

// ------------------------
// Q5. 构造函数中箭头函数 this 不丢失
// ------------------------
function Animal(this: any, name: string) {
  this.name = name;
  this.say = function () {
    console.log("Q5 say:", this.name); // ❌ this 丢失后变 undefined
  };
  this.sayArrow = () => {
    console.log("Q5 arrow:", this.name); // ✅ 始终绑定在构造时的 this
  };
}

const cat = new (Animal as any)("Kitty");
const say1 = cat.say;
const say2 = cat.sayArrow;

say1(); // ❌ undefined
say2(); // ✅ Kitty

// ------------------------
// Q6. 闭包作用域独立
// ------------------------
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    console.log("Q6:", count);
  };
}

const counterA = makeCounter();
const counterB = makeCounter();

counterA(); // ✅ 1
counterA(); // ✅ 2
counterB(); // ✅ 1（独立闭包）
