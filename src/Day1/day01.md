# 🤔 JavaScript: `undefined` vs `null`

## 🔍 Core Differences

| Feature          | `undefined`                        | `null`                                   |
| ---------------- | ---------------------------------- | ---------------------------------------- |
| Meaning          | Variable declared but not assigned | Assigned by developer to mean "no value" |
| Who assigns it   | JavaScript engine                  | Developer (you)                          |
| Type             | `undefined`                        | `object` (legacy quirk)                  |
| Use case         | Uninitialized variables, no return | Intentional empty or null object         |
| Falsy?           | ✅ Yes                              | ✅ Yes                                    |
| Equality (`==`)  | `undefined == null` → ✅ true       |                                          |
| Identity (`===`) | `undefined !== null` → ✅ true      |                                          |

---

## ✅ Examples

```js
let a;
let b = null;

console.log(typeof a); // "undefined"
console.log(typeof b); // "object"

console.log(a === undefined); // true
console.log(b === null);      // true

console.log(a == b); // true  (loose equality)
console.log(a === b); // false (strict equality)

if (!a) console.log("a is falsy"); // printed
if (!b) console.log("b is falsy"); // printed
```

---

## 🧠 Remember

- Use `null` when **you** want to indicate "no value"
- Use `undefined` when **JavaScript** hasn't assigned a value yet