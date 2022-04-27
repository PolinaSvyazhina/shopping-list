import { ProductModel } from '../../models/ProductStore.types';

export function getTotalPrice(stateProduct: ProductModel) {
  if (stateProduct.price === null || stateProduct.measurementUnits === null || stateProduct.count === null)
    return roundPrice(stateProduct.totalPrice);
  return stateProduct.measurementUnits === 'Grams' || stateProduct.measurementUnits === 'Milliliters'
    ? roundPrice((stateProduct.price * stateProduct.count) / 1000)
    : roundPrice(stateProduct.price * stateProduct.count);
}

export function getPrice(stateProduct: ProductModel) {
  if (
    stateProduct.totalPrice === null ||
    stateProduct.measurementUnits === null ||
    stateProduct.count === null ||
    (stateProduct.count === 0 && stateProduct.price === null)
  )
    return roundPrice(stateProduct.price);
  if (stateProduct.count === 0) return 0;
  return stateProduct.measurementUnits === 'Grams' || stateProduct.measurementUnits === 'Milliliters'
    ? roundPrice((stateProduct.totalPrice / stateProduct.count) * 1000)
    : roundPrice(stateProduct.totalPrice / stateProduct.count);
}

export function roundPrice(price: number) {
  return Math.ceil(price * 100) / 100;
}
