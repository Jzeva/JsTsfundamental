2 + 3; // 5
5 - 1; // 4
4 * 2; // 8
9 / 3; // 3
10 % 3; // 1 （取余数）

5 == "5"; // true（非严格相等，做了类型转换）
5 === "5"; // false（严格相等，类型不同）
5 != "5"; // false
5 !== "5"; // true
7 > 3; // true
7 >= 7; // true
2 < 1; // false

true && false; // false（必须两个都为 true 才返回 true）
true || false; // true（只要有一个为 true 就返回 true）
!true; // false（取反）

const isLoggedIn = true;
const result = isLoggedIn && "Welcome!"; // 返回 'Welcome!'

let x = 5;
x += 3; // 相当于 x = x + 3，现在 x = 8
x *= 2; // x = x * 2，现在 x = 16

2 +
  3 *
    4(
      // 2 + 12 = 14
      2 + 3
    ) *
    4; // 5 * 4 = 20
true || (false && false); // true（&& 优先）

"5" == 5; // true（字符串被转换为数字）
"5" === 5; // false（类型不一样）
null == undefined; // true（特殊情况）
null === undefined; // false
false == 0; // true（坑）

let day = 3;

switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Another day");
}
// 输出：Wednesday
// Break is needed for every case

let age = 17;
let access = age >= 18 ? "Allowed" : "Denied";
console.log(access); // 输出：Denied


//4. Truthy / Falsy 值
// 在 JS 中，以下值被认为是 falsy（假），其它都为 truthy（真）：

// 值	结果
// false	❌
// 0	❌
// ''（空字符串）	❌
// null	❌
// undefined	❌
// NaN	❌

if ("hello")   // true
if (123)       // true
if ([])        // true（数组也是对象）
if ({})        // true（对象也为真）
