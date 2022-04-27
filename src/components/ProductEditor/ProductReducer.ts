import { MeasurementUnitsType, ProductModel } from '../../models/ProductStore.types';
import { getPrice, getTotalPrice } from './helpersReducer';

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
      result.price = getPrice(result);
      result.totalPrice = getTotalPrice(result);
      return result;
    }
    case 'measurementUnits': {
      const result: ProductModel = {
        ...state,
        measurementUnits: action.measurementUnits as MeasurementUnitsType,
      };
      result.price = getPrice(result);
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
    case 'totalPrice': {
      const result = { ...state, totalPrice: action.totalPrice };
      result.price = getPrice(result);
      return result;
    }
    default:
      return state;
  }
}
