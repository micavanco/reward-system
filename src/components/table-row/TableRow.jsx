import './TableRow.css';

function TableRow({ data }) {
    return (
        <tr className="table-row">
            {
                data && data.map(row => (
                    <td className="table-row__cell" key={row}>{row}</td>
                ))
            }
        </tr>
    );
}

export default TableRow;
