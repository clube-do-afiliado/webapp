export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link href="https://cdn.clubedoafiliado.com/assets/css/poppins.css" rel="stylesheet" />
                <link href="https://unicons.iconscout.com/release/v4.0.8/css/line.css" rel="stylesheet" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
