// import { fireEvent, render } from '@testing-library/react';

// import Tab from '../TabButton';
// import Tabs from '../Tabs';
// import TabContent from '../TabContent';

// describe('Tabs', () => {

//     window.HTMLElement.prototype.scrollIntoView = function () { };
//     it('Should render component correctly', () => {
//         const { getByTestId } = render(
//             <Tabs data-testid="tabs">
//                 <Tab label="Primeira Aba" />
//                 <Tab label="Segunda Aba" />
//                 <Tab label="Terceira Aba" />
//                 <Tab label="Quarta Aba" />
//             </Tabs>
//         );

//         expect(getByTestId('tabs')).toBeInTheDocument();
//     });

//     it('Should render tabs with correct label', () => {
//         const tabs = render(
//             <Tabs>
//                 <Tab label="Primeira Aba" />
//                 <Tab label="Segunda Aba" />
//             </Tabs>
//         );

//         expect(tabs.container).toHaveTextContent('Primeira Aba');
//         expect(tabs.container).toHaveTextContent('Segunda Aba');
//     });

//     it('Should render active tab with highlight', () => {
//         const { getByTestId } = render(
//             <Tabs>
//                 <Tab label="Primeira Aba" data-testid="first-tab-button" />
//                 <Tab label="Segunda Aba" data-testid="second-tab-button" />
//             </Tabs>
//         );

//         const firstTab = getByTestId('first-tab-button');
//         expect(firstTab).toHaveClass('active');

//         const secondTab = getByTestId('second-tab-button');
//         fireEvent.click(secondTab);

//         expect(secondTab).toHaveClass('active');
//         expect(firstTab).not.toHaveClass('active');
//     });

//     it('Should render tab content correctly', () => {
//         const { getByTestId } = render(
//             <>
//                 <Tabs>
//                     <Tab label="Primeira Aba" data-testid="first-tab-button" />
//                     <Tab label="Segunda Aba" data-testid="second-tab-button" />
//                 </Tabs>

//                 <TabContent value={1} current={1} data-testid="first-tab-content">
//                     <span >Primeira Aba</span>
//                 </TabContent>
//                 <TabContent value={2} current={1} data-testid="second-tab-content">
//                     <span >Segunda Aba</span>
//                 </TabContent>
//             </>
//         );

//         expect(getByTestId('first-tab-content')).toHaveTextContent('Primeira Aba');
//         expect(getByTestId('first-tab-content')).not.toHaveAttribute('hidden');
//         expect(getByTestId('second-tab-content')).toHaveAttribute('hidden');
//     });

//     describe('Should render boder line with correctly color when', () => {
//         it('is primary theme', () => {
//             const tabs = render(
//                 <Tabs data-testid="tabs" context="primary">
//                     <Tab label="Primeira Aba" />
//                     <Tab label="Segunda Aba" />
//                 </Tabs>
//             );

//             expect(tabs.container.querySelector('#border-line')).toHaveClass('primary');
//         });

//         it('is secondary theme', () => {
//             const tabs = render(
//                 <Tabs context="secondary">
//                     <Tab label="Primeira Aba" />
//                     <Tab label="Segunda Aba" />
//                 </Tabs>
//             );

//             expect(tabs.container.querySelector('#border-line')).toHaveClass('secondary');
//         });
//     });
// });
