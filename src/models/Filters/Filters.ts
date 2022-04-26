import { ProductModel } from '../ProductStore.types';

export interface IProductFilter {
  isCorrect(product: ProductModel): boolean;
}

export type IBuyingPlaceProductFilter = IProductFilter;

export type IProductBuyingFilter = IProductFilter;

export class BuyingPlaceProductFilter implements IProductBuyingFilter {
  private _places: string[];

  public constructor(places: string[]) {
    this._places = places;
  }

  isCorrect(product: ProductModel): boolean {
    return this._places.some((place) => product.buyWhere == place);
  }
}

export class BoughtProductFilter implements IProductBuyingFilter {
  isCorrect(product: ProductModel): boolean {
    return product.bought;
  }
}

export class NotBoughtProductFilter implements IProductBuyingFilter {
  isCorrect(product: ProductModel): boolean {
    return !product.bought;
  }
}
