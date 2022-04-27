export function roundPrice(price: number) {
  return Math.ceil(price * 100) / 100;
}
