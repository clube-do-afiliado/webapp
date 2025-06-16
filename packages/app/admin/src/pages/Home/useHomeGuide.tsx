import { useGuide } from '@cda/ui/components/Guide';
import Typography from '@cda/ui/components/Typography';

export default function useHomeGuide() {
    return useGuide([
        {
            name: 'dashboard',
            content: (
                <Typography textAlign="center">
                    Veja rapidamente como sua página está performando com dados de acessos e impressões.
                </Typography>
            ),
            orientation: {
                horizontal: 'center',
                vertical: 'top'
            },
            callback: {
                start: () => { console.debug('callback 1'); }
            }
        },
        {
            name: 'filters',
            content: (
                <Typography textAlign="center">
                    Use os filtros para ajustar o período e ver os dados que mais importam para você.
                </Typography>
            ),
            orientation: {
                horizontal: 'center',
                vertical: 'top'
            },
            callback: {
                start: () => { console.debug('callback 2'); }
            }
        },
        {
            name: 'summary',
            content: (
                <Typography textAlign="center">
                    Resumo das suas métricas: veja
                    suas visualizações, impressões e quantos produtos você está divulgando
                </Typography>
            ),
            orientation: {
                horizontal: 'center',
                vertical: 'top'
            },
            callback: {
                start: () => { console.debug('callback 3'); }
            }
        }
    ]);
}