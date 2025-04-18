import { applyTheme, createTheme } from '@cda/ui/theme/utils';

import { Site } from '@cda/services/sites';

interface ThemeProviderProps { site: Site; }
export default function ThemeProvider({ site }: ThemeProviderProps) {
    const { primaryColor, secondaryColor } = site.theme;

    const theme = createTheme({
        palette: {
            primary: primaryColor,
            secondary: secondaryColor
        }
    });

    setTimeout(() => { applyTheme(theme); }, 0);

    return null;
}