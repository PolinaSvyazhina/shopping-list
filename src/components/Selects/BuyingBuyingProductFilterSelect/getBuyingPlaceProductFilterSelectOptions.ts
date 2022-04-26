import { ProductModel } from '../../../models/ProductStore.types';
import { ProductsAggregationStoreImpl } from '../../../models/ProductsAggregationStore';

export function getBuyingPlaceProductFilterSelectOptions(products: Array<ProductModel>) {
  return [
    ...new Set(
      products
        .filter((product) =>
          ProductsAggregationStoreImpl.ProductPurchaseFilter !== null
            ? ProductsAggregationStoreImpl.ProductPurchaseFilter.isCorrect(product)
            : true
        )
        .map((product) => product.buyWhere)
    ),
  ].map((place) => ({
    label: place,
    value: place,
  }));
}
