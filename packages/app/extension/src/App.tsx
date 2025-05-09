import { useEffect, useState } from 'react';

import Icon from '@cda/ui/components/Icon';
import Stack from '@cda/ui/components/Stack';
import Zoom from '@cda/ui/animations/Zoom';
import Slide from '@cda/ui/animations/Slide';
import Loading from '@cda/ui/components/Loading';
import Typography from '@cda/ui/components/Typography';
import { createTheme, ThemeProvider } from '@cda/ui/theme';

import { decode } from '@cda/toolkit/jwt';
import { slug } from '@cda/toolkit/string';
import { wait } from '@cda/toolkit/promise';
import logger from '@cda/toolkit/logger';

import type { FirebaseUser } from '@cda/services/user';
import { Product } from '@cda/services/products';

import { UserProvider, useUser } from '@cda/common/User';
import { SitesProvider, useSites } from '@cda/common/Sites';
import { ProductsProvider, useProducts } from '@cda/common/Products';

import Layout from './layout';
import { getCookie } from './services/chrome';
import type { Info } from './scrapings/interface';
import LoggedContent from './components/LoggedContent';
import { productServices, siteServices, userServices } from './services/core';

type State = 'success' | 'error' | 'content' | 'loading';

function Content() {
    const { user, getUser } = useUser();
    const { createProduct } = useProducts();
    const { userSites, getUserSites } = useSites();

    const [state, setState] = useState<State>('content');

    useEffect(() => { setup(); }, []);

    const setup = async () => {
        const token = await getCookie('getCookie', 'access_token');

        if (!token) { return; }

        const fireUser = decode<FirebaseUser>(token);

        Promise.all([
            getUserSites(fireUser.user_id),
            getUser(fireUser.email)
        ]);
    };

    const getProduct = () => {
        setState('loading');

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0]?.id;

            if (!tabId) return;

            chrome.tabs.sendMessage<any, Info>(tabId, { type: 'GET_PAGE_TITLE' }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Erro ao enviar mensagem:', chrome.runtime.lastError.message);
                } else {
                    const newProduct: Omit<Product, 'id'> = {
                        name: response.title,
                        price: response.price,
                        slug: slug(response.title),
                        integration: response.integration,
                        originalPrice: response.originalPrice,
                        storeId: userSites[0].id,
                        images: [response.img],
                        visible: false,
                        url: '',
                        tags: []
                    };

                    logger.info({ newProduct });

                    wait(() => {
                        createProduct(newProduct)
                            .then(() => wait(() => setState('success'), 1500))
                            .catch(() => wait(() => setState('error'), 1500))
                            .finally(() => wait(() => setState('content'), 1500));
                    }, 500);
                }
            });
        });
    };

    return (
        <Layout>
            <>
                {
                    state === 'content' && userSites[0] && user && (
                        <Slide enter direction="bottom">
                            <LoggedContent
                                site={userSites[0]}
                                user={user}
                                onGetProduct={getProduct}
                            />
                        </Slide>
                    )
                }
                {
                    state === 'loading' && (
                        <Slide enter direction="bottom">
                            <Stack
                                justifyContent="center"
                                alignItems="center"
                                style={{ minHeight: 350 }}
                            >
                                <Loading size={45} />
                                <Typography
                                    noMargin
                                    variant="h5"
                                >
                                    Buscando informações
                                </Typography>
                            </Stack>
                        </Slide>
                    )
                }
                {
                    state === 'success' && (
                        <Zoom enter>
                            <Stack
                                justifyContent="center"
                                alignItems="center"
                                spacing="small"
                                style={{ minHeight: 350 }}
                            >
                                <Icon
                                    name="check-circle"
                                    color="success.main"
                                    style={{ fontSize: 55 }}
                                />
                                <Typography
                                    noMargin
                                    variant="h5"
                                >
                                    Produto salvo
                                </Typography>
                            </Stack>
                        </Zoom>
                    )
                }
                {
                    state === 'error' && (
                        <Zoom enter>
                            <Stack
                                justifyContent="center"
                                alignItems="center"
                                spacing="small"
                                style={{ minHeight: 350 }}
                            >
                                <Icon
                                    name="exclamation-octagon"
                                    color="warning.main"
                                    style={{ fontSize: 55 }}
                                />
                                <Typography
                                    noMargin
                                    variant="h5"
                                >
                                    Erro ao obter informações
                                </Typography>
                            </Stack>
                        </Zoom>
                    )
                }
            </>
        </Layout>
    );
}

export default function App() {
    return (
        <ThemeProvider theme={createTheme()}>
            <UserProvider userServices={userServices}>
                <SitesProvider sitesServices={siteServices}>
                    <ProductsProvider productsServices={productServices}>
                        <Content />
                    </ProductsProvider>
                </SitesProvider>
            </UserProvider>
        </ThemeProvider>
    );
}
