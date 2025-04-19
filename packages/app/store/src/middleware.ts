import { NextResponse } from 'next/server';

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

export async function middleware() {
    // if (request.nextUrl.pathname === '/produtos') {
    //     // Faz o request para a API
    //     const apiResponse = await fetch('https://api.example.com/produtos');
    //     const produtos = await apiResponse.json();

    //     // Clona a request e adiciona headers customizados
    //     const headers = new Headers(request.headers);
    //     headers.set('x-middleware-data', JSON.stringify(produtos));

    //     // Retorna a response modificada
    //     return NextResponse.next({
    //         request: { headers }
    //     });
    // }

    return NextResponse.next();
}