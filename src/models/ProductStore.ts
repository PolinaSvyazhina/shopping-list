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
    this.products.set(index, product);
    ProductTransports.updateProduct(product);
  }

  get totalAmount() {
    return ProductStoreImpl.getProducts.reduce((res, e) => res + e.totalPrice, 0);
  }

  removeAllProducts() {
    this.products.clear();
    ProductTransports.clearLocalStorage();
  }

  purchaseProduct(id: string) {
    const productInfo = this.products.get(id);
    productInfo.purchased = !productInfo.purchased;
  }

  isPurchased(id: string) {
    const productInfo = this.products.get(id);
    return productInfo.purchased;
  }

  get getProducts() {
    return [...this.products.values()];
  }

  get getProductPlaces() {
    const places = [...this.products.values()]
      .map((product) => product.buyWhere)
      .filter((buyWhere) => buyWhere !== null && buyWhere.length !== 0);
    return [...new Set(places)];
  }
}

export const ProductStoreImpl = new ProductStore();
