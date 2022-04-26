import { ProductModel } from './ProductStore.types';
import { makeAutoObservable } from 'mobx';
import { IProductsSort } from './Sorts/Sorts';
import { IProductBuyingFilter, IBuyingPlaceProductFilter } from './Filters/Filters';

class ProductsAggregationStore {
  public PurchasePlaceProductFilter: IBuyingPlaceProductFilter = null;
  public ProductPurchaseFilter: IProductBuyingFilter = null;
  public ProductsSort: IProductsSort = null;

  public constructor() {
    makeAutoObservable(this);
  }

  setPurchasePlaceProductFilter(filter: IBuyingPlaceProductFilter) {
    this.PurchasePlaceProductFilter = filter;
  }

  setProductPurchaseFilter(filter: IProductBuyingFilter) {
    this.ProductPurchaseFilter = filter;
  }

  setProductsSort(sort: IProductsSort) {
    this.ProductsSort = sort;
  }

  removePurchasePlaceProductFilter() {
    this.PurchasePlaceProductFilter = null;
  }

  removeProductPurchaseFilter() {
    this.ProductPurchaseFilter = null;
  }

  removeProductsSort() {
    this.ProductsSort = null;
  }

  get filters() {
    if (this.PurchasePlaceProductFilter === null && this.ProductPurchaseFilter === null) return [];
    if (this.PurchasePlaceProductFilter === null) return [this.ProductPurchaseFilter];
    if (this.ProductPurchaseFilter === null) return [this.PurchasePlaceProductFilter];
    return [this.PurchasePlaceProductFilter, this.ProductPurchaseFilter];
  }

  getProductAggregation() {
    return (products: ProductModel[]) => {
      const filteredProducts =
        this.filters.length === 0
          ? products
          : products.filter((product) => this.filters.every((filter) => filter.isCorrect(product)));

      return this.ProductsSort === null ? filteredProducts : this.ProductsSort.sort(filteredProducts);
    };
  }
}

export const ProductsAggregationStoreImpl = new ProductsAggregationStore();
