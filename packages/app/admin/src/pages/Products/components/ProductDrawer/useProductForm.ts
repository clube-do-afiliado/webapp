import { FormControl, useForm } from '@cda/ui/components/Form';

import { slug } from '@cda/toolkit/string';

import type { Product } from '@cda/services/products';

import { useProducts } from '@cda/common/Products';
import { useSites } from '@cda/common/Sites';

import type { ProductForm } from './interface';

export default function useProductForm(product: Product | undefined, onToggleDrawer: () => void) {
    const { updateProduct, createProduct } = useProducts();
    const { userSites } = useSites();

    const [formGroup] = useForm<ProductForm>({
        form: {
            name: new FormControl({ defaultValue: product?.name || '', required: true }),
            tags: new FormControl({ defaultValue: product?.tags || [], required: true }),
            url: new FormControl({ defaultValue: product?.url || '', required: true }),
            price: new FormControl({
                defaultValue: Number(product?.price) * 100 || 0,
                type: 'money',
                required: true
            }),
            originalPrice: new FormControl({
                defaultValue: Number(product?.originalPrice) * 100 || 0,
                type: 'money'
            }),
            image: new FormControl({ defaultValue: product?.images[0] || '', required: true }),
            storeId: new FormControl({
                defaultValue: product?.storeId || (userSites.length ? userSites[0].id : ''),
                required: true
            }),
            integration: new FormControl({ defaultValue: product?.integration || '', required: true }),
        },
        handle: {
            submit: (form) => {
                if (!product) {
                    const { name, originalPrice, price, storeId, tags, url, integration, image } = form.values;

                    createProduct({
                        url,
                        name,
                        tags,
                        storeId,
                        integration,
                        visible: false,
                        slug: slug(name),
                        images: [image],
                        price: Number(price) / 100,
                        originalPrice: Number(originalPrice) / 100,
                    }).then(onToggleDrawer);
                } else {
                    updateProduct({
                        ...product,
                        ...form.values,
                        originalPrice: Number(form.values.originalPrice) / 100,
                        price: Number(form.values.price) / 100,
                    }).then(onToggleDrawer);
                }
            },
        },
        validator: {
            url: (form) => {
                const { url } = form.values;

                // eslint-disable-next-line
                const regex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;

                if (!regex.test(url)) { return 'Deve ser uma url válida'; }

                return '';
            }
        }
    }, [product, userSites]);

    return [formGroup];
}