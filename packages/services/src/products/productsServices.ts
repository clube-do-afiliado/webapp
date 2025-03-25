import { uuid } from '@cda/toolkit/uuid';

import db from '../db';
import type { Product } from './interface';

export default class ProductsServices {
    private static PATH = 'products';

    constructor(private db: db) { }

    async list() {
        return this.db.getList<Product>({
            path: ProductsServices.PATH,
            pathSegments: [],
            filters: [],
        });
    }

    async getStoreProducts(storeId: string) {
        return this.db.getList<Product>({
            path: ProductsServices.PATH,
            pathSegments: [],
            filters: [{ field: 'storeId', operator: '==', value: storeId }],
        });
    }

    async getVisibleStoreProducts(storeId: string) {
        return this.db.getList<Product>({
            path: ProductsServices.PATH,
            pathSegments: [],
            filters: [
                { field: 'storeId', operator: '==', value: storeId },
                { field: 'visible', operator: '==', value: true }
            ],
        });
    }

    async details(id: string) {
        return this.db.getItem<Product>({
            path: ProductsServices.PATH,
            pathSegments: [],
            filters: [{ field: 'id', operator: '==', value: id }],
        });
    }

    async create(product: Omit<Product, 'id'>) {
        const id = uuid();

        const newProduct: Product = { ...product, id };

        return this.db.setItem<Product>({
            data: newProduct,
            path: ProductsServices.PATH,
            pathSegments: [id],
        }).then(() => newProduct);
    }

    async delete(id: string) {
        return this.db.deleteItem({
            path: ProductsServices.PATH,
            pathSegments: [id],
        });
    }

    async update(product: Product) {
        return this.db.setItem<Product>({
            data: product,
            path: ProductsServices.PATH,
            pathSegments: [product.id],
        }).then(() => product);
    }
}