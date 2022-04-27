import { ProductModel } from './ProductStore.types';
import { makeAutoObservable } from 'mobx';
import { ProductTransports } from '../Transports/ProductTransports';

class ProductStore {
  public products: Map<string, ProductModel> = new Map<string, ProductModel>();

  constructor() {
    makeAutoObservable(this);
    ProductTransports.getProducts().forEach((product) => this.products.set(product.id, product));
  }

  addProduct(product: ProductModel) {
    this.products.set(product.id, product);
    ProductTransports.addProduct(product);
  }

  removeProduct(id: string) {
    this.products.delete(id);
    ProductTransports.removeProduct(id);
  }

  updateProduct(product: ProductModel) {
    const index = product.id;
    ProductTransports.updateProduct(product);
    this.products.set(index, product);
  }

  removeAllProducts() {
    this.products.clear();
    ProductTransports.clearLocalStorage();
  }

  switchBoughtProduct(id: string) {
    const productInfo = this.products.get(id);
    productInfo.bought = !productInfo.bought;
    ProductTransports.updateProduct(productInfo);
  }

  isBought(id: string) {
    const productInfo = this.products.get(id);
    return productInfo.bought;
  }

  get getProducts() {
    return [...this.products.values()];
  }
}

export const ProductStoreImpl = new ProductStore();
