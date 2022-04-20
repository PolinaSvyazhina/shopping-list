import { MeasurementUnits, ProductModel } from './models/ProductStore.types';

interface convertedPriceResult {
  value: number;
  price: (value: number) => number;
  text: string;
}

export function priceConverter(stateProduct: ProductModel) {
  const result: convertedPriceResult = {
    value: 0,
    price: null,
    text: '',
  };

  if (stateProduct.measurementUnits === MeasurementUnits.Grams) {
    result.price = (value) => (value ? value / 1000 : null);
    result.text = 'кг';
    result.value = stateProduct.price ? stateProduct.price * 1000 : null;
  } else if (stateProduct.measurementUnits === MeasurementUnits.Milliliters) {
    result.price = (value) => (value ? value / 1000 : null);
    result.text = 'литр';
    result.value = stateProduct.price ? stateProduct.price * 1000 : null;
  } else {
    result.price = (value) => value;
    result.text = 'шт';
    result.value = stateProduct.price;
  }

  return result;
}
