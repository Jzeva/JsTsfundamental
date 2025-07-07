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

//this issue
// ✅ this 指向判断练习总结（含题目 + 正确答案 + 注释解释）

// ----------------------------
// Q1: 箭头函数在对象中定义
// ----------------------------
const user = {
  name: "John",
  greet: () => {
    console.log("Q1:", this.name); // ❌ this 是 globalThis → undefined
  },
};
user.greet(); // 输出：undefined

// ----------------------------
// Q2: 普通函数 this 丢失
// ----------------------------
const person = {
  name: "Alice",
  sayHi() {
    console.log("Q2:", this.name); // this 预期为 person
  },
};
const say = person.sayHi;
say(); // 输出：undefined（裸调用 → this = globalThis）

// ----------------------------
// Q3: bind 修复 this
// ----------------------------
const obj = {
  count: 42,
  start() {
    setTimeout(
      function () {
        console.log("Q3:", this.count); // ✅ this = obj（通过 bind 绑定）
      }.bind(this),
      100
    );
  },
};
obj.start(); // 输出：42

// ----------------------------
// Q4: 构造函数中普通函数 vs 箭头函数
// ----------------------------
function Timer(this: any) {
  this.seconds = 0;

  setInterval(function () {
    this.seconds++;
    console.log("Q4 (normal):", this.seconds); // ❌ this = globalThis → NaN or error
  }, 1000);

  setInterval(() => {
    this.seconds++;
    console.log("Q4 (arrow):", this.seconds); // ✅ this = Timer 实例 → 每秒递增
  }, 1000);
}

const timer = new (Timer as any)();

// ----------------------------
// Q5: class 中的普通方法 vs 箭头函数
// ----------------------------
class Logger {
  prefix = "Log:";

  print1() {
    console.log("Q5.1:", this.prefix); // ❌ this 丢失时为 undefined
  }

  print2 = () => {
    console.log("Q5.2:", this.prefix); // ✅ this 保留为实例对象
  };
}

const logger = new Logger();
const f1 = logger.print1;
const f2 = logger.print2;

f1(); // 输出：undefined（裸调用，this 丢失）
f2(); // 输出：Log:（箭头函数保留 this）
