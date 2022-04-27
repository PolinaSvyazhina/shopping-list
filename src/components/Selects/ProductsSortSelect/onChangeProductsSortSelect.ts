import { ProductsAggregationStoreImpl } from '../../../models/ProductsAggregationStore';
import {
  ProductAlphabetSort,
  ProductDateSort,
  ProductDateCreateSort,
  ProductPriceSort,
  SortDirection,
} from '../../../models/Sorts/Sorts';
import { SelectValueSort } from '../SelectValue';

export function onChangeProductsSortSelect(e: SelectValueSort) {
  switch (e.name) {
    case 'Новее':
      ProductsAggregationStoreImpl.setProductsSort(new ProductDateCreateSort(SortDirection.Ascending));
      break;
    case 'Старее':
      ProductsAggregationStoreImpl.setProductsSort(new ProductDateCreateSort(SortDirection.Descending));
      break;
    case 'Дороже':
      ProductsAggregationStoreImpl.setProductsSort(new ProductPriceSort(SortDirection.Ascending));
      break;
    case 'Дешевле':
      ProductsAggregationStoreImpl.setProductsSort(new ProductPriceSort(SortDirection.Descending));
      break;
    case 'А - Я':
      ProductsAggregationStoreImpl.setProductsSort(new ProductAlphabetSort(SortDirection.Ascending));
      break;
    case 'Я - А':
      ProductsAggregationStoreImpl.setProductsSort(new ProductAlphabetSort(SortDirection.Descending));
      break;
    case 'Скоро':
      ProductsAggregationStoreImpl.setProductsSort(new ProductDateSort(SortDirection.Ascending));
      break;
    case 'Позже':
      ProductsAggregationStoreImpl.setProductsSort(new ProductDateSort(SortDirection.Descending));
      break;
  }
}
