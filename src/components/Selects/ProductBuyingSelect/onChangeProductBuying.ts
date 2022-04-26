import { ProductsAggregationStoreImpl } from '../../../models/ProductsAggregationStore';
import { NotBoughtProductFilter, BoughtProductFilter } from '../../../models/Filters/Filters';
import { SelectValue } from '../SelectValue';

export function onChangeProductBuying(e: SelectValue) {
  if (e.value === 'showAll') {
    ProductsAggregationStoreImpl.removeProductPurchaseFilter();
  } else if (e.value === 'purchased') {
    ProductsAggregationStoreImpl.setProductPurchaseFilter(new BoughtProductFilter());
  } else {
    ProductsAggregationStoreImpl.setProductPurchaseFilter(new NotBoughtProductFilter());
  }
}
