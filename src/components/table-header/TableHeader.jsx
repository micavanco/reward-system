import './TableHeader.css';

function TableHeader({ data, specialKey }) {
    return (
        <thead className="table-header">
            <tr>
                {
                    data && data.map(header => (
                        <td className="table-header__cell" key={`${header}-${specialKey}`}>{header}</td>
                    ))
                }
            </tr>
        </thead>
    );
}

export default TableHeader;
