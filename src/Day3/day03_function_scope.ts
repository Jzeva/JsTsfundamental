// ------------------------------
// 1. Function Declarations
// ------------------------------
//can support hoisting
console.log(greet("John"));
function greet(name: string): string {
  return `Hello, ${name}`;
}

// ✅ 输出：Hello, John

// ------------------------------
// 2. Function Expressions
// ------------------------------
//not supporting hoisting
const greetExpression = function (name: string): string {
  return `Hi, ${name}`;
};

console.log(greetExpression("Alice")); // ✅ 输出：Hi, Alice

// ------------------------------
// 3. Arrow Functions
// ------------------------------
const greetArrow = (name: string): string => `Hey, ${name}`;
console.log(greetArrow("Bob")); // ✅ 输出：Hey, Bob

// 多参数 + 带块体写法
const add = (a: number, b: number): number => {
  return a + b;
};

console.log(add(3, 4)); // ✅ 输出：7

// ------------------------------
// 4. Function Hoisting
// ------------------------------
hoistedFunction(); // ✅ 正常运行（函数声明被提升）

function hoistedFunction(): void {
  console.log("This function is hoisted.");
}

// nonHoistedFunction(); // ❌ 报错：Cannot access 'nonHoistedFunction' before initialization

const nonHoistedFunction = function (): void {
  console.log("This function is NOT hoisted.");
};

// ------------------------------
// 5. Scope Chain
// ------------------------------
function outerFunction(): void {
  const outerVar = "I’m outside!";

  function innerFunction(): void {
    const innerVar = "I’m inside!";
    console.log(outerVar); // ✅ 可以访问外层变量
    console.log(innerVar); // ✅ 正常
  }

  innerFunction();

  // console.log(innerVar); // ❌ 报错：Cannot find name 'innerVar'
}

outerFunction();

// ------------------------------
// 6. Block Scope (let/const vs var)
// ------------------------------
{
  var x = "var: I'm function scoped";
  let y = "let: I'm block scoped";
  const z = "const: I'm also block scoped";
}

console.log(x); // ✅ 可访问，因为 var 是函数作用域
// console.log(y); // ❌ 报错：y is not defined
// console.log(z); // ❌ 报错：z is not defined

// ------------------------------
// 7. Arrow Function 注意事项
// ------------------------------
const person = {
  name: "John",
  sayHelloTraditional: function () {
    console.log(`Hello, I'm ${this.name}`); // ✅ this 指向 person
  },
  sayHelloArrow: () => {
    // ❌ this 在箭头函数中不是指向 person，而是上层作用域（例如全局）
    // console.log(`Hello, I'm ${this?.name}`);
  },
};

person.sayHelloTraditional(); // Hello, I'm John
person.sayHelloArrow(); // Hello, I'm undefined

// -------------------------------------
// Arrow Function vs Traditional Function
// -------------------------------------

// ✅ 1. THIS 绑定差异
console.log("=== 1. `this` Difference ===");

const person1 = {
  name: "John",
  sayHiTraditional: function () {
    console.log(`Traditional: Hi, I'm ${this.name}`); // this 指向 person1
  },
  sayHiArrow: () => {
    // this 在这里指向的是定义时的外层作用域（通常是 globalThis）
    console.log(`Arrow: Hi, I'm ${this?.name}`); // this.name = undefined
  },
};

person1.sayHiTraditional(); // ✅ 输出：Hi, I'm John
person1.sayHiArrow(); // ❌ 输出：Hi, I'm undefined

// ✅ 2. `arguments` 对象
console.log("\n=== 2. `arguments` Support ===");

function showArgsTraditional() {
  console.log("Traditional arguments:", arguments); // ✅ 可用
}
showArgsTraditional(1, 2, 3);

// const showArgsArrow = () => {
//   console.log("Arrow arguments:", arguments); // ❌ 报错：arguments is not defined
// };
// showArgsArrow(4, 5, 6); // ❌ 报错

// ✅ 正确的箭头函数写法使用 rest 参数
const showArgsArrowFixed = (...args: number[]) => {
  console.log("Arrow (with rest):", args);
};
showArgsArrowFixed(4, 5, 6); // ✅ 输出：[4, 5, 6]

// ✅ 3. 构造函数支持
console.log("\n=== 3. Constructor Support ===");

function PersonTraditional(this: any, name: string) {
  this.name = name;
}
const alice = new (PersonTraditional as any)("Alice");
console.log("Constructed by traditional:", alice.name); // ✅ 输出：Alice

// const PersonArrow = (name: string) => {
//   this.name = name;
// };
// const bob = new PersonArrow("Bob"); // ❌ TypeError: PersonArrow is not a constructor

// ✅ 4. 使用场景建议
console.log("\n=== 4. Use Case Summary ===");

// ✅ 推荐场景：回调函数 / 简单函数体
const numbers = [1, 2, 3];
const doubled = numbers.map((n) => n * 2);
console.log("Doubled:", doubled); // [2, 4, 6]

// ❌ 不推荐使用箭头函数的地方：对象方法、构造函数

/* -------------------------------
   总结：

   | 特性           | 普通函数             | 箭头函数                  |
   |----------------|----------------------|---------------------------|
   | this           | 动态绑定             | 词法绑定（外层作用域）     |
   | arguments      | ✅ 支持              | ❌ 不支持                  |
   | 构造函数支持   | ✅ 支持              | ❌ 不支持                  |
   | 使用场景       | 方法、构造函数等     | 简洁函数、回调、嵌套函数等 |
-------------------------------- */
