import TableRow from '../table-row/TableRow';
import TableHeader from '../table-header/TableHeader';

import './Table.css';

function Table({ tableHeader, tableRows }) {
    return (
        <table className="table">
            <TableHeader data={tableHeader}/>
            <tbody>
            {
                tableRows && tableRows.length > 0 && tableRows.map(row => (
                    <TableRow key={row[0]} data={row}/>
                ))
            }
            </tbody>
        </table>
    );
}

export default Table;
