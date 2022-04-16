import { ProductModel } from './ProductStore.types';
import { makeAutoObservable } from 'mobx';
import { ProductTransports } from '../Transports/ProductTransports';

class ProductStore {
  public products: Map<string, ProductModel> = new Map<string, ProductModel>();
  public direction = 1;
  public isMarkedFilter: boolean = null;

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
    [...this.products.values()].map((e) => (total += Number(e.price)));
    return total;
  }

  removeAllProducts() {
    this.products.clear();
    ProductTransports.clearLocalStorage();
  }

  sortDataProducts() {
    this.products = new Map<string, ProductModel>(
      [...this.products.entries()].sort((a, b) => {
        return (+new Date(a[1].date) - +new Date(b[1].date)) * +this.direction;
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

  filterProductsByPlace(places: Array<string>) {
    return [...this.products.values()].filter((element) => {
      return places.some((e) => e === element.buyWhere);
    });
  }

  get getProducts() {
    return [...this.products.values()].filter((e) => this.isMarkedFilter === null || this.isMarkedFilter === e.marked);
  }
}

export const ProductStoreImpl = new ProductStore();
