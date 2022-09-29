import './TableHeader.css';

function TableHeader({ data }) {
    return (
        <tr className="table-header">
            {
                data && data.map(header => (
                    <td className="table-header__cell" key={header}>{header}</td>
                ))
            }
        </tr>
    );
}

export default TableHeader;
