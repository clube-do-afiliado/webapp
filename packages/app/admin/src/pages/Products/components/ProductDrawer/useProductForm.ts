import { FormControl, useForm } from '@cda/ui/components/Form';

import { slug } from '@cda/toolkit/string';

import type { Product } from '@cda/services/products';

import { useProducts } from '@cda/common/Products';
import { useSites } from '@cda/common/Sites';

import { serverFunctions } from '@/services/core';

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
            submit: async (form) => {
                const { storeId, url } = form.values;

                if (!product) {
                    const shortUrl = await serverFunctions.getFunction('shortUrl', {
                        storeId,
                        originalUrl: url
                    });

                    createProduct({
                        ...generateProductData(form.values),
                        visible: false,
                        shortUrl: shortUrl.hash
                    }).finally(onToggleDrawer);
                } else {
                    let hash = product.shortUrl;

                    if (!hash) {
                        const shortUrl = await serverFunctions.getFunction('shortUrl', {
                            storeId,
                            originalUrl: url
                        });

                        hash = shortUrl.hash;
                    }

                    updateProduct({
                        ...product,
                        ...generateProductData(form.values),
                        shortUrl: hash,
                    }).finally(onToggleDrawer);
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

    const generateProductData = (data: ProductForm): Omit<Product, 'id' | 'visible' | 'shortUrl'> => {
        return {
            url: data.url,
            name: data.name,
            tags: data.tags,
            storeId: data.storeId,
            integration: data.integration,
            slug: slug(data.name),
            images: [data.image],
            price: Number(data.price) / 100,
            originalPrice: Number(data.originalPrice) / 100,
        };
    };

    return [formGroup];
}