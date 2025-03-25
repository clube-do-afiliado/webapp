import { useContext } from 'react';

import { ProductsContext } from './ProductsProvider';

export default function useProducts() {
    return useContext(ProductsContext);
}