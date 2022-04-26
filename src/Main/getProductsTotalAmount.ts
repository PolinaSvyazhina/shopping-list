import { ProductModel } from '../models/ProductStore.types';

export function getProductsTotalAmount(products: Array<ProductModel>) {
  return products.reduce((res, e) => res + e.totalPrice, 0);
}
