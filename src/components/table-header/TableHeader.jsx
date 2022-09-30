import './TableHeader.css';

function TableHeader({ data, specialKey }) {
    return (
        <thead className="table-header">
            <tr role={'row'} aria-label={'table-header-row'}>
                {
                    data && data.map(header => (
                        <td className="table-header__cell" role={'cell'} key={`${header}-${specialKey}`}>{header}</td>
                    ))
                }
            </tr>
        </thead>
    );
}

export default TableHeader;
