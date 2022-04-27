import { ProductModel } from '../models/ProductStore.types';
import { roundPrice } from '../roundPrice';

export function getProductsTotalAmount(products: Array<ProductModel>) {
  return roundPrice(products.reduce((res, e) => res + e.totalPrice, 0));
}
