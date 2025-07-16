# Day 4: `this` & Closures (JS/TS Review)

## 🎯 Goals

* Understand how `this` behaves in different contexts
* Learn how to control and bind `this`
* Grasp the concept and use cases of closures
* Be able to implement a counter using closures

---

## 🔹 Part 1: `this` in JavaScript

### 1. Default Binding

```js
function show() {
  console.log(this);
}
show(); // In browsers: window (in strict mode: undefined)
```

### 2. Implicit Binding (Object Method)

```js
const obj = {
  name: 'Tom',
  sayHi() {
    console.log(this.name);
  }
};
obj.sayHi(); // 'Tom'
```

### 3. Explicit Binding (`call`, `apply`, `bind`)

```js
function greet() {
  console.log(this.name);
}
const user = { name: 'John' };
greet.call(user); // 'John'
```

### 4. `new` Binding

```js
function Person(name) {
  this.name = name;
}
const p = new Person('Alice');
console.log(p.name); // 'Alice'
```

### 🔸 Arrow Functions and `this`

Arrow functions capture the `this` from their defining scope.

```js
const obj = {
  name: 'Arrow',
  say: () => {
    console.log(this.name);
  }
};
obj.say(); // undefined
```

### 🔸 Timer Trap

```js
function Timer() {
  this.seconds = 0;
  setInterval(function () {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}
new Timer(); // NaN (wrong this)
```

---

## 🔹 Part 2: Closures

### ✅ What is a Closure?

> A closure is a function that remembers the variables from its lexical scope, even after the outer function has finished executing.

### ✅ Use Cases:

* Data privacy
* Function factories
* Maintaining state between function calls

### 📦 Closure Counter Example

```js
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

---

## ⚠️ Common Pitfalls

| Case                          | Problem                                 | Solution                            |
| ----------------------------- | --------------------------------------- | ----------------------------------- |
| Arrow function `this`         | Unexpected global `this`                | Use regular functions for methods   |
| `setInterval` or `setTimeout` | Loses correct `this`                    | Use arrow function or `.bind(this)` |
| Shared closure variable       | All closures refer to the same variable | Use IIFE or block scope (let)       |

---
