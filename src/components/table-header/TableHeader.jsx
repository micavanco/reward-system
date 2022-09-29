import './TableHeader.css';

function TableHeader({ data }) {
    return (
        <thead className="table-header">
            <tr>
                {
                    data && data.map(header => (
                        <td className="table-header__cell" key={header}>{header}</td>
                    ))
                }
            </tr>
        </thead>
    );
}

export default TableHeader;
