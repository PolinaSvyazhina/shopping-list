import { ProductModel } from '../../../models/ProductStore.types';
import { ProductsAggregationStoreImpl } from '../../../models/ProductsAggregationStore';

export function getBuyingPlaceProductFilterSelectOptions(products: Array<ProductModel>) {
  return [
    ...new Set(
      products
        .filter((product) =>
          ProductsAggregationStoreImpl.ProductBuyingFilter !== null
            ? ProductsAggregationStoreImpl.ProductBuyingFilter.isCorrect(product)
            : true
        )
        .map((product) => product.buyWhere)
        .filter((buyWhere) => buyWhere !== null && buyWhere !== '')
    ),
  ].map((place) => ({
    label: place,
    value: place,
  }));
}
