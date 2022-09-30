import { render, screen } from '@testing-library/react';
import TableHeader from './TableHeader';

describe('TableHeader', () => {
    it('should render component properly', () => {
        const tableHeaderData = ['mock1', 'mock2'];

        render(<table><TableHeader data={tableHeaderData} specialKey={'mock'}/></table>);

        const tableHeader = screen.getByRole('row', { name: 'table-header-row' });
        const rows = screen.getAllByRole('cell');

        expect(tableHeader).toBeInTheDocument();
        expect(rows.length).toEqual(2);
    });
});
