# ✅ 普通函数 vs 箭头函数：`this` 指向判断总结

---

## 🧠 基本对比

| 特性            | 普通函数 (`function`)                          | 箭头函数 (`=>`)                           |
| --------------- | ---------------------------------------------- | ----------------------------------------- |
| `this` 来源     | 💡 **调用时决定**（动态绑定）                   | 💡 **定义时决定**（词法绑定）              |
| 调用时 `this`   | 看谁“调用了它”（谁在 `.` 点的左边）            | 来自**包裹它的作用域**中的 `this`         |
| 能否改变 `this` | ✅ 可用 `.bind()`、`.call()`、`.apply()` 等方法 | ❌ 无法用 `.bind()` 等方式修改             |
| 用作对象方法    | ✅ 推荐                                         | ❌ 不推荐（`this` 不指向对象）             |
| 用于回调函数    | ❌ 容易丢失 `this`（如 `setTimeout`）           | ✅ 不会丢失 `this`，常用于回调             |
| 构造函数支持    | ✅ 可用于 `new` 实例化                          | ❌ 无法用于 `new`，无原型、无自己的 `this` |

---

## ✅ 判断 `this` 指向的步骤

### 🔹 对于普通函数：

```ts
function say() {
  console.log(this);
}
```

- 判断规则：**看调用方式**

| 调用方式          | `this` 是谁？                                                 |
| ----------------- | ------------------------------------------------------------- |
| `obj.say()`       | `this === obj`                                                |
| `say()`           | `this === globalThis`（非严格模式）或 `undefined`（严格模式） |
| `say.call(other)` | `this === other`                                              |
| `setTimeout(say)` | `this === globalThis`                                         |

### 🔹 对于箭头函数：

```ts
const say = () => {
  console.log(this);
}
```

- 判断规则：**看定义时的外层作用域**

| 定义位置                              | `this` 是谁？                      |
| ------------------------------------- | ---------------------------------- |
| 全局定义                              | `this === globalThis`              |
| 对象方法中定义箭头函数                | `this === globalThis`（❗不是对象） |
| 构造函数中定义箭头函数                | `this === 实例对象` ✅              |
| 回调中使用箭头函数（如 `setTimeout`） | `this === 外层作用域的 this` ✅     |

---

## 🔥 核心口诀

> 🧠 **普通函数 `this` 看调用，箭头函数 `this` 看定义！**

---

## 🎯 快速代码对比

### ✅ 普通函数：
```ts
const obj = {
  name: "Alice",
  say() {
    console.log(this.name); // this = obj
  }
};

obj.say();      // ✅ Alice
const fn = obj.say;
fn();           // ❌ undefined（this = globalThis）
```

### ✅ 箭头函数：
```ts
const obj = {
  name: "Alice",
  say: () => {
    console.log(this.name); // ❌ this = globalThis
  }
};

obj.say(); // ❌ undefined
```

---

## ✅ 两个问题检验 this：

1. **调用这段函数时，左边是谁？（普通函数）**
2. **这个函数是在什么作用域定义的？（箭头函数）**

---
