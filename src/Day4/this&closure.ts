// closures_this_exercises.ts

// Exercise 1: Arrow function vs normal function
const obj1 = {
  value: 42,
  print: function () {
    setTimeout(() => {
      console.log("Exercise 1:", this.value); // should log 42
    }, 1000);
  },
};
obj1.print();

// Exercise 2: Closure-based counter with reset
function createCounterWithReset() {
  let count = 0;
  return {
    increment: () => ++count,
    reset: () => (count = 0),
  };
}

const counter = createCounterWithReset();
console.log("Exercise 2.1:", counter.increment()); // 1
console.log("Exercise 2.2:", counter.increment()); // 2
counter.reset();
console.log("Exercise 2.3:", counter.increment()); // 1

// Exercise 3: Arrow function and outer `this`
const globalName = "Global";
const person = {
  name: "Tom",
  say: () => {
    console.log("Exercise 3:", this.name); // undefined
  },
};
person.say();

// Exercise 4: Fix the Timer using arrow function
function FixedTimer() {
  this.seconds = 0;
  setInterval(() => {
    this.seconds++;
    console.log("Exercise 4:", this.seconds);
  }, 1000);
}
new FixedTimer();
