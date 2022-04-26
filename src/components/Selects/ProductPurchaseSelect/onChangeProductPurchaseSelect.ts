import { ProductsAggregationStoreImpl } from '../../../models/ProductsAggregationStore';
import { NotPurchaseProductFilter, PurchasedProductFilter } from '../../../models/Filters/Filters';
import { SelectValue } from '../SelectValue';

export function onChangeProductPurchaseSelect(e: SelectValue) {
  if (e.value === 'showAll') {
    ProductsAggregationStoreImpl.removeProductPurchaseFilter();
  } else if (e.value === 'purchased') {
    ProductsAggregationStoreImpl.setProductPurchaseFilter(new PurchasedProductFilter());
  } else {
    ProductsAggregationStoreImpl.setProductPurchaseFilter(new NotPurchaseProductFilter());
  }
}
