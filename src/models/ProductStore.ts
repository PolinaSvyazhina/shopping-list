import { ProductModel } from './ProductStore.types';
import { makeAutoObservable } from 'mobx';
import { ProductTransports } from '../Transports/ProductTransports';

class ProductStore {
  public products: Map<string, ProductModel> = new Map<string, ProductModel>();
  public direction = 1;
  public isMarkedFilter: boolean = null;
  public places: Array<string> = [];

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
    ProductStoreImpl.getProducts.map((e) => (total += Number(e.price)));
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

  sortPriceExpensiveProducts() {
    this.products = new Map<string, ProductModel>(
      [...this.products.entries()].sort((a, b) => {
        return b[1].price - a[1].price;
      })
    );
  }

  sortPriceCheapProducts() {
    this.products = new Map<string, ProductModel>(
      [...this.products.entries()].sort((a, b) => {
        return a[1].price - b[1].price;
      })
    );
  }

  sortAlphabeticallyProducts() {
    this.products = new Map<string, ProductModel>(
      [...this.products.entries()].sort((a, b) => {
        return a[1].name.localeCompare(b[1].name, 'ru', { sensitivity: 'base', numeric: true });
      })
    );
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

  setPlaces(places: Array<string>) {
    this.places = places;
  }

  get getProducts() {
    let result = [...this.products.values()];
    if (this.places.length !== 0) {
      result = result.filter((element) => {
        return this.places.some((e) => e === element.buyWhere);
      });
    }
    if (this.isMarkedFilter !== null) {
      result = result.filter((e) => this.isMarkedFilter === e.marked);
    }
    return result;
  }
}

export const ProductStoreImpl = new ProductStore();
