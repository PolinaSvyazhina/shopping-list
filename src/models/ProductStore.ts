import { ProductModel } from './ProductStore.types';
import { makeAutoObservable } from 'mobx';
import { ProductTransports } from '../Transports/ProductTransports';

class ProductStore {
  public products: Map<string, ProductModel> = new Map<string, ProductModel>();
  public direction = false;

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
    this.products.set(index, product);
    ProductTransports.updateProduct(product);
  }

  getTotal() {
    let total = 0;
    this.products.map((e) => (total += Number(e.price)));
    return total;
  }

  removeAllProducts() {
    this.products.clear();
    ProductTransports.clearLocalStorage();
  }

  sortDataProducts() {
    this.products = new Map<string, ProductModel>(
      [...this.products.entries()].sort((a, b) => {
        if (a[1].date > b[1].date) {
          return this.direction ? 1 : -1;
        }
        if (a[1].date < b[1].date) {
          return this.direction ? -1 : 1;
        }
        return 0;
      })
    );
    this.direction = !this.direction;
  }

  get getProducts() {
    return [...this.products.values()];
  }
}

export const ProductStoreImpl = new ProductStore();
