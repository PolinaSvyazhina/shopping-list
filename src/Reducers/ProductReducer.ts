import { ProductModel } from '../models/ProductStore.types';

export type ProductAction =
  | { type: 'name'; name: string }
  | { type: 'count'; count: number }
  | { type: 'measurementUnits'; measurementUnits: string }
  | { type: 'buyWhere'; buyWhere: string }
  | { type: 'price'; price: number }
  | { type: 'data'; data: Date }
  | { type: 'replacement'; replacement: string };

export function productReducer(state: ProductModel, action: ProductAction) {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.name };
    case 'count':
      return { ...state, count: action.count };
    case 'measurementUnits':
      return { ...state, measurementUnits: action.measurementUnits };
    case 'buyWhere':
      return { ...state, buyWhere: action.buyWhere };
    case 'price':
      return { ...state, price: action.price };
    case 'replacement':
      return { ...state, replacement: action.replacement };
    case 'data':
      return { ...state, date: action.data };

    default:
      return state;
  }
}
