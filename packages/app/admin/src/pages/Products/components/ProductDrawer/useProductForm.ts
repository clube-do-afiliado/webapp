import { FormControl, useForm } from '@cda/ui/components/Form';

import type { Product } from '@cda/services/products';

import { useProducts } from '@cda/common/Products';

import type { ProductForm } from './interface';

export default function useProductForm(product: Product | undefined, onToggleDrawer: () => void) {
    const { updateProduct } = useProducts();

    const [formGroup] = useForm<ProductForm>({
        form: {
            name: new FormControl({ defaultValue: product?.name || '', required: true }),
            tags: new FormControl({ defaultValue: product?.tags || [], required: true }),
            price: new FormControl({
                defaultValue: Number(product?.price) * 100 || 0,
                type: 'money',
                required: true
            }),
            originalPrice: new FormControl({
                defaultValue: Number(product?.originalPrice) * 100 || 0,
                type: 'money'
            }),
            images: new FormControl({ defaultValue: product?.images || [], required: true }),
            storeId: new FormControl({ defaultValue: product?.storeId || '', required: true }),
            integration: new FormControl({ defaultValue: product?.integration || '', required: true }),
        },
        handle: {
            submit: (form) => {
                if (!product) { return; }

                updateProduct({
                    ...product,
                    ...form.values,
                    originalPrice: Number(form.values.originalPrice) / 100,
                    price: Number(form.values.price) / 100,
                }).then(onToggleDrawer);
            },
        }
    }, [product]);

    return [formGroup];
}