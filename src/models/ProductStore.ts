import { ProductInfo, ProductModel } from './ProductStore.types';
import { makeAutoObservable } from 'mobx';
import { ProductTransports } from '../Transports/ProductTransports';

class ProductStore {
  public products: Map<string, ProductInfo> = new Map<string, ProductInfo>();
  public direction = 1;
  public isMarkedFilter: boolean = null;

  constructor() {
    makeAutoObservable(this);
    ProductTransports.getProducts().forEach((product) =>
      this.products.set(product.id, {
        product,
        marked: false,
      })
    );
  }

  addProduct(product: ProductModel) {
    this.products.set(product.id, { product, marked: false });
    ProductTransports.addProduct(product);
  }

  removeProduct(id: string) {
    this.products.delete(id);
    ProductTransports.removeProduct(id);
  }

  updateProduct(product: ProductModel) {
    const index = product.id;
    this.products.set(index, { product, marked: false });
    ProductTransports.updateProduct(product);
  }

  getTotal() {
    let total = 0;
    [...this.products.values()].map((e) => (total += Number(e.product.price)));
    return total;
  }

  removeAllProducts() {
    this.products.clear();
    ProductTransports.clearLocalStorage();
  }

  sortDataProducts() {
    this.products = new Map<string, ProductInfo>(
      [...this.products.entries()].sort((a, b) => {
        return (+new Date(a[1].product.date) - +new Date(b[1].product.date)) * +this.direction;
      })
    );
    this.direction = -this.direction;
  }

  markProduct(id: string) {
    const productInfo = this.products.get(id);
    productInfo.marked = !productInfo.marked;
  }

  setFilter(isMarkedFilter: boolean) {
    this.isMarkedFilter = isMarkedFilter;
  }

  isMarked(id: string) {
    const productInfo = this.products.get(id);
    return productInfo.marked;
  }

  get getProducts() {
    return [...this.products.values()]
      .filter((e) => this.isMarkedFilter === null || this.isMarkedFilter === e.marked)
      .map((e) => e.product);
  }
}

export const ProductStoreImpl = new ProductStore();
