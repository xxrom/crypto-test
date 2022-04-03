export const toFixedNumber = (amount: number | string, accuracy = 6) =>
  Number(amount).toFixed(accuracy);
