import type { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://cdn.clubedoafiliado.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://unicons.iconscout.com" crossOrigin="anonymous" />

                {/* Fontes e ícones */}
                <link
                    href="https://cdn.clubedoafiliado.com/assets/css/poppins.css"
                    rel="stylesheet"
                    as="style"
                />
                <link
                    href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
                    rel="stylesheet"
                    as="style"
                />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
