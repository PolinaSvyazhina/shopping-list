import { ProductStoreImpl } from '../../../models/ProductStore';

export function PurchasePlaceProductFilterSelectOptions() {
  return ProductStoreImpl.getProductPlaces.map((buyWhere) => ({ label: buyWhere, value: buyWhere }));
}
