import { render, screen } from '@testing-library/react';
import TableRow from './TableRow';

describe('TableRow', () => {
    it('should render component properly', () => {
        const tableRowData = ['mock3', 'mock4'];

        render(<table><tbody><TableRow data={tableRowData} specialKey={'mock'}/></tbody></table>);

        const tableRow = screen.getByRole('row', { name: 'table-row' });
        const cells = screen.getAllByRole('cell');
        const mock3Cell = screen.getByText('mock3');

        expect(tableRow).toBeInTheDocument();
        expect(cells.length).toEqual(2);
        expect(mock3Cell).toBeInTheDocument();
    });
});
