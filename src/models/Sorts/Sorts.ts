import { ProductModel } from '../ProductStore.types';

export interface IProductsSort {
  sort(products: ProductModel[]): ProductModel[];
}

export enum SortDirection {
  Ascending = 1,
  Descending = -1,
}

export class ProductDateSort implements IProductsSort {
  public direction: SortDirection;

  public constructor(direction: SortDirection) {
    this.direction = direction;
  }

  sort(products: ProductModel[]): ProductModel[] {
    return [...products].sort((first, second) => {
      return (+new Date(first.date) - +new Date(second.date)) * this.direction;
    });
  }
}

export class ProductPriceSort implements IProductsSort {
  public direction: SortDirection;

  public constructor(direction: SortDirection) {
    this.direction = direction;
  }

  sort(products: ProductModel[]): ProductModel[] {
    return [...products].sort((first, second) => {
      return (second.totalPrice - first.totalPrice) * this.direction;
    });
  }
}

export class ProductAlphabetSort implements IProductsSort {
  public direction: SortDirection;

  public constructor(direction: SortDirection) {
    this.direction = direction;
  }

  sort(products: ProductModel[]): ProductModel[] {
    return [...products].sort((first, second) => {
      return (
        first.name.localeCompare(second.name, 'ru', {
          sensitivity: 'base',
          numeric: true,
        }) * this.direction
      );
    });
  }
}
