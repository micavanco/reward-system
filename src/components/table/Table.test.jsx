import { render, screen } from '@testing-library/react';
import Table from './Table';

describe('Table', () => {
    it('should render component properly', () => {
        render(<Table/>);
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
    });

    it('should contains table header and table body', () => {
        const tableHeaderData = ['mock1', 'mock2'];
        const tableRowsData = [['mockRow1', 'mockRow2']];

        render(<Table tableHeader={tableHeaderData} tableRows={tableRowsData} specialKey={'mock'}/>);

        const tableHeader = screen.getByRole('row', { name: 'table-header-row' });
        const tableRows = screen.getByRole('row', { name: 'table-row' });

        expect(tableHeader).toBeInTheDocument();
        expect(tableRows).toBeInTheDocument();
    });
});
