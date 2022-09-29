import TableRow from '../table-row/TableRow';
import TableHeader from '../table-header/TableHeader';

import './Table.css';

function Table({ tableHeader, tableRows, specialKey }) {
    return (
        <table className="table">
            <TableHeader data={tableHeader} specialKey={specialKey}/>
            <tbody>
            {
                tableRows && tableRows.length > 0 && tableRows.map((row, index) => (
                    <TableRow key={`${row[0]}-${specialKey}-${index}`} data={row}/>
                ))
            }
            </tbody>
        </table>
    );
}

export default Table;
