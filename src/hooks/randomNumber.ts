export const makeRandomNumber = (count: number) => {
  let numbers: number[] = [];

  while (numbers.length < count) {
    const number = Math.floor(Math.random() * 10); // 0 ~ 9
    const notSame = !numbers.includes(number);

    notSame && numbers.push(number);
  }

  return numbers;
};
