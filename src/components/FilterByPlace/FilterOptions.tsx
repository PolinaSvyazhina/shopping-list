import { ProductStoreImpl } from '../../models/ProductStore';

export function Options() {
  const options: Array<object> = [];
  ProductStoreImpl.getProducts.forEach(
    (e) =>
      e.buyWhere &&
      !options.some((obj) => {
        return Object.values(obj)[1].includes(e.buyWhere);
      }) &&
      options.push({ label: e.buyWhere, value: e.buyWhere })
  );
  return options;
}
