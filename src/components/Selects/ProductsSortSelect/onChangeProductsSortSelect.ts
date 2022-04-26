import { ProductSortSelectValue } from './ProductsSortSelect';
import { ProductsAggregationStoreImpl } from '../../../models/ProductsAggregationStore';
import { ProductAlphabetSort, ProductDateSort, ProductPriceSort, SortDirection } from '../../../models/Sorts/Sorts';
import { SelectValue } from '../SelectValue';

export function onChangeProductsSortSelect(e: SelectValue) {
  switch (e.value) {
    case ProductSortSelectValue.None:
      ProductsAggregationStoreImpl.removeProductsSort();
      break;
    case ProductSortSelectValue.AddedEarlier:
      ProductsAggregationStoreImpl.setProductsSort(new ProductDateSort(SortDirection.Ascending));
      break;
    case ProductSortSelectValue.AddedLater:
      ProductsAggregationStoreImpl.setProductsSort(new ProductDateSort(SortDirection.Descending));
      break;
    case ProductSortSelectValue.Expensive:
      ProductsAggregationStoreImpl.setProductsSort(new ProductPriceSort(SortDirection.Ascending));
      break;
    case ProductSortSelectValue.Cheaper:
      ProductsAggregationStoreImpl.setProductsSort(new ProductPriceSort(SortDirection.Descending));
      break;
    case ProductSortSelectValue.Alphabetically:
      ProductsAggregationStoreImpl.setProductsSort(new ProductAlphabetSort(SortDirection.Ascending));
      break;
    case ProductSortSelectValue.ReverseAlphabetically:
      ProductsAggregationStoreImpl.setProductsSort(new ProductAlphabetSort(SortDirection.Descending));
      break;
  }
}
