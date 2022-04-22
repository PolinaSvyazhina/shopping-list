import { MeasurementUnitsType, ProductModel } from '../../models/ProductStore.types';

export type ProductAction =
  | { type: 'name'; name: string }
  | { type: 'count'; count: number }
  | { type: 'measurementUnits'; measurementUnits: string }
  | { type: 'buyWhere'; buyWhere: string }
  | { type: 'price'; price: number }
  | { type: 'data'; data: Date }
  | { type: 'replacement'; replacement: string }
  | { type: 'totalPrice'; totalPrice: number };

export function productReducer(state: ProductModel, action: ProductAction) {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.name };
    case 'count': {
      const result = { ...state, count: action.count };
      result.totalPrice = getTotalPrice(result);
      return result;
    }
    case 'measurementUnits': {
      const result: ProductModel = { ...state, measurementUnits: action.measurementUnits as MeasurementUnitsType };
      result.totalPrice = getTotalPrice(result);
      return result;
    }
    case 'buyWhere':
      return { ...state, buyWhere: action.buyWhere };
    case 'price': {
      const result = { ...state, price: action.price };
      result.totalPrice = getTotalPrice(result);
      return result;
    }
    case 'replacement':
      return { ...state, replacement: action.replacement };
    case 'data':
      return { ...state, date: action.data };
    default:
      return state;
  }
}

export function getTotalPrice(stateProduct: ProductModel) {
  if (stateProduct.price === null || stateProduct.measurementUnits === null || stateProduct.count === null) return 0;
  return stateProduct.measurementUnits === 'Grams' || stateProduct.measurementUnits === 'Milliliters'
    ? (stateProduct.price * stateProduct.count) / 1000
    : stateProduct.price * stateProduct.count;
}
