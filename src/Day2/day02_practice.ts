function getMax(a: number, b: number) {
  // TODO: 用 if / else 实现
  if (a > b) {
    return a;
  } else if (a < b) {
    return b;
  } else {
    return null;
  }
}
function getDayName(num: number) {
  // TODO: 用 switch 实现
  switch (num) {
    case 1:
      console.log("Monday");
      break;
    case 7:
      console.log("Sunday");
      break;
    default:
      console.log("Lazy day");
  }
}
