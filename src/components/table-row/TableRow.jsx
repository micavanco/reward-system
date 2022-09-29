import './TableRow.css';

function TableRow({ data }) {
    return (
        <tr className="table-row">
            {
                data && data.map((row, index) => (
                    <td className="table-row__cell" key={`${row}-${index}`}>{row}</td>
                ))
            }
        </tr>
    );
}

export default TableRow;
