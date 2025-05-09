import Slide from '@cda/ui/animations/Slide';
import Typography from '@cda/ui/components/Typography';
import { Table, TableBody, TableCell, TableHeader } from '@cda/ui/components/Table';

import type { Product } from '@cda/services/products';

import ProductRow from './ProductRow';

import './ProductTable.scss';

interface ProductTableProps { products: Product[]; onToggleDrawer: (product: Product) => void; }
export default function ProductTable({ products, onToggleDrawer }: ProductTableProps) {
    return (
        <Table className="product-table">
            <TableHeader>
                <TableCell align="left" style={{ width: 400 }}>Nome do produto</TableCell>
                <TableCell align="center" style={{ width: 250 }}>Loja</TableCell>
                <TableCell align="center">Preço</TableCell>
                <TableCell align="right" style={{ width: 50 }}>Visibilidade</TableCell>
                <TableCell align="right" style={{ width: 50 }}>Ações</TableCell>
            </TableHeader>
            <TableBody>
                {
                    products
                        .sort((a, b) => a.integration.localeCompare(b.integration))
                        .map((product, i) => (
                            <Slide
                                enter
                                key={product.id}
                                tag="tr"
                                direction="left"
                                delay={(i + 1) * 100}
                                style={{ position: 'relative' }}
                                className="product-table-row"
                            >
                                <ProductRow product={product} onToggleDrawer={onToggleDrawer} />
                            </Slide>
                        ))
                }
                {
                    !products.length && (
                        <Slide enter tag="tr" direction="top">
                            <TableCell colSpan={5}>
                                <Typography textAlign="center" color="text.secondary">
                                    Nenhum produto encontrado
                                </Typography>
                            </TableCell>
                        </Slide>
                    )
                }
            </TableBody>
        </Table>
    );
}