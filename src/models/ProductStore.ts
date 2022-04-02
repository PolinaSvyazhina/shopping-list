import { ProductModel } from './ProductStore.types';
import { makeAutoObservable } from 'mobx';
import { ProductTransports } from '../Transports/ProductTransports';

class ProductStore {
  public products: Array<ProductModel> = [];

  constructor() {
    makeAutoObservable(this);
    this.products = ProductTransports.getProducts();
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
