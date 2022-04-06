import { ProductModel } from './ProductStore.types';
import { makeAutoObservable } from 'mobx';
import { ProductTransports } from '../Transports/ProductTransports';

class ProductStore {
  public products: Array<ProductModel> = [];
  public direction = false;

  constructor() {
    makeAutoObservable(this);
    this.products = ProductTransports.getProducts();
  }

  sortDataProducts() {
    this.products = this.products.sort((a, b) => {
      if (a.date > b.date) {
        return this.direction ? 1 : -1;
      }
      if (a.date < b.date) {
        return this.direction ? -1 : 1;
      }
      return 0;
    });
    this.direction = !this.direction;
  }

  addProduct(product: ProductModel) {
    this.products.push(product);
    ProductTransports.addProduct(product);
  }

  removeProduct(id: string) {
    this.products = this.products.filter((e) => e.id !== id);
    ProductTransports.removeProduct(id);
  }

  updateProduct(product: ProductModel) {
    const index = this.products.findIndex((e) => e.id === product.id);
    this.products[index] = product;
    ProductTransports.updateProduct(product);
  }

  removeAllProducts() {
    this.products = [];
    ProductTransports.clearLocalStorage();
  }
}

export const ProductStoreImpl = new ProductStore();
