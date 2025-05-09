import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { useAlert } from '@cda/ui/components/Alert';

import type { Product } from '@cda/services/products';
import type ProductsServices from '@cda/services/products';

export interface ProductsContextConfig {
    loading: boolean;

    products: Product[];

    getProducts: () => Promise<void>;
    getStoreProducts: (storeId: string) => Promise<void>;

    deleteProduct: (id: string) => Promise<void>;

    createProduct: (data: Omit<Product, 'id'>) => Promise<Product>;

    updateProduct: (data: Product) => Promise<void>;
}

export const ProductsContext = createContext<ProductsContextConfig>({
    loading: true,
    products: [],

    getProducts: () => Promise.resolve(),
    getStoreProducts: () => Promise.resolve(),

    deleteProduct: () => Promise.resolve(),

    createProduct: () => Promise.resolve({} as Product),

    updateProduct: () => Promise.resolve(),
});

export default function ProductsProvider({ children, productsServices }: PropsWithChildren<{
    productsServices: ProductsServices
}>) {
    const { addAlert } = useAlert();

    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState<Product[]>([]);

    const context = useMemo<ProductsContextConfig>(() => ({
        loading,

        products,

        getProducts: () => getProducts(),
        getStoreProducts: (storeId) => getStoreProducts(storeId),

        deleteProduct: (id) => deleteProduct(id),

        createProduct: (data) => createProduct(data),

        updateProduct: (data) => updateProduct(data),
    }), [products, loading]);

    const getProducts = async () => {
        return productsServices.list()
            .then(res => setProducts(res))
            .finally(() => setLoading(false));
    };

    const getStoreProducts = async (storeId: string) => {
        return productsServices.getStoreProducts(storeId)
            .then(res => setProducts(res))
            .finally(() => setLoading(false));
    };

    const deleteProduct = async (id: string) => {
        return productsServices.delete(id)
            .then(() => setProducts(prev => prev.filter(r => r.id !== id)))
            .then(() => addAlert({ color: 'success', message: 'Produto deletado com sucesso' }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível deletar o produto' }));
    };

    const createProduct = async (data: Omit<Product, 'id'>) => {
        return productsServices.create(data)
            .then(res => {
                setProducts((prev) => ([...prev, res]));
                addAlert({ color: 'success', message: 'O produto foi adicionado' });

                return res;
            })
            .catch(() => {
                addAlert({ color: 'error', message: 'Não foi possível criar o produto' });
                throw new Error('Error to create product');
            });
    };

    const updateProduct = async (data: Product) => {
        return productsServices.update(data)
            .then(() => setProducts(prev => prev.map(r => r.id === data.id ? data : r)))
            .then(() => addAlert({ color: 'success', message: 'O produto foi editado' }))
            .catch(() => addAlert({ color: 'error', message: 'Não foi possível editar o produto' }));
    };

    return (
        <ProductsContext.Provider value={context}>
            {children}
        </ProductsContext.Provider>
    );
}