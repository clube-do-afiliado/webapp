import Box from '../../components/Box';

import './Content.scss';

interface ContentProps { children: React.ReactNode; }
export default function Content({ children }: ContentProps) {
    return (
        <Box
            className="ui-content"
            sx={{ backgroundColor: ({ background }) => background.paper }}
        >
            {children}
        </Box>
    );
}