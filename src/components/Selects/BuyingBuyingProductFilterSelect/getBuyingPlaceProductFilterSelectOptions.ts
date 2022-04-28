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
        .filter((product) => product.buyWhere !== null && product.buyWhere.replace(/\s/g, '').length > 0)
        .map((product) => product.buyWhere)
    ),
  ].map((place) => ({
    label: place,
    value: place,
  }));
}
