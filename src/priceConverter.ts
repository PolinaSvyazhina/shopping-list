import { MeasurementUnits, ProductModel } from './models/ProductStore.types';

enum dimensionsProductText {
  Kilograms = 'кг',
  Liters = 'литр',
  Pieces = 'шт',
}

interface convertedPriceResult {
  value: number;
  price: (value: number) => number;
  text: dimensionsProductText;
}

export function priceConverter(stateProduct: ProductModel): convertedPriceResult {
  if (stateProduct.measurementUnits === MeasurementUnits.Grams) {
    return {
      price: (value) => (value !== null ? value / 1000 : null),
      text: dimensionsProductText.Kilograms,
      value: stateProduct.price !== null ? stateProduct.price * 1000 : null,
    };
  }
  if (stateProduct.measurementUnits === MeasurementUnits.Milliliters) {
    return {
      price: (value) => (value !== null ? value / 1000 : null),
      text: dimensionsProductText.Liters,
      value: stateProduct.price !== null ? stateProduct.price * 1000 : null,
    };
  }
  if (stateProduct.measurementUnits === MeasurementUnits.Pieces) {
    return {
      price: (value) => value,
      text: dimensionsProductText.Pieces,
      value: stateProduct.price,
    };
  }
}
