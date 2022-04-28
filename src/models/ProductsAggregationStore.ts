import { ProductModel } from './ProductStore.types';
import { makeAutoObservable } from 'mobx';
import { IProductsSort } from './Sorts/Sorts';
import { IProductBuyingFilter, IBuyingPlaceProductFilter } from './Filters/Filters';

class ProductsAggregationStore {
  public BuyingPlaceProductFilter: IBuyingPlaceProductFilter = null;
  public ProductBuyingFilter: IProductBuyingFilter = null;
  public ProductsSort: IProductsSort = null;

  public constructor() {
    makeAutoObservable(this);
  }

  setPurchasePlaceProductFilter(filter: IBuyingPlaceProductFilter) {
    this.BuyingPlaceProductFilter = filter;
  }

  setProductPurchaseFilter(filter: IProductBuyingFilter) {
    this.ProductBuyingFilter = filter;
  }

  setProductsSort(sort: IProductsSort) {
    this.ProductsSort = sort;
  }

  removePurchasePlaceProductFilter() {
    this.BuyingPlaceProductFilter = null;
  }

  removeProductPurchaseFilter() {
    this.ProductBuyingFilter = null;
  }

  removeProductsSort() {
    this.ProductsSort = null;
  }

  get filters() {
    if (this.BuyingPlaceProductFilter === null && this.ProductBuyingFilter === null) return [];
    if (this.BuyingPlaceProductFilter === null) return [this.ProductBuyingFilter];
    if (this.ProductBuyingFilter === null) return [this.BuyingPlaceProductFilter];
    return [this.BuyingPlaceProductFilter, this.ProductBuyingFilter];
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
