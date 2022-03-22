import {ProductModel} from "../Models/ProductModel";
import {makeAutoObservable} from "mobx";
import {ProductTransports} from "../Transports/ProductTransports";

class ProductStore {
    public products: Array<ProductModel> = [];

    constructor() {
        ProductTransports.init();
        makeAutoObservable(this);
    }

    getProducts(){
        this.products = ProductTransports.getProducts();
    }

    addProduct(product: ProductModel){
        this.products.push(product);
       ProductTransports.addProduct(product)
    }

    removeProduct(id: string){
        this.products = this.products.filter(e =>e.id !== id);
        ProductTransports.removeProduct(id);
    }

    updateProduct(product:ProductModel){
        this.products.filter(e => e.id === product.id)[0] = product;
        ProductTransports.updateProduct(product);
    }
}

const ProductStoreImpl = new ProductStore();
export default ProductStoreImpl;