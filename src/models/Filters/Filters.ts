import { ProductModel } from '../ProductStore.types';

export interface IProductFilter {
  isCorrect(product: ProductModel): boolean;
}

export type IPurchasePlaceProductFilter = IProductFilter;

export type IProductPurchaseFilter = IProductFilter;

export class PurchasePlaceProductFilter implements IProductPurchaseFilter {
  private _places: string[];

  public constructor(places: string[]) {
    this._places = places;
  }

  isCorrect(product: ProductModel): boolean {
    return this._places.some((place) => product.buyWhere == place);
  }
}

export class PurchasedProductFilter implements IProductPurchaseFilter {
  isCorrect(product: ProductModel): boolean {
    return product.purchased;
  }
}

export class NotPurchaseProductFilter implements IProductPurchaseFilter {
  isCorrect(product: ProductModel): boolean {
    return !product.purchased;
  }
}
