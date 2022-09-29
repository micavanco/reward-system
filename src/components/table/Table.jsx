import TableRow from "../table-row/TableRow";

function Table({ tableHeaders, tableRows }) {
    return (
        <table className="table">

            <TableRow data={tableRows}/>
        </table>
    );
}

export default Table;
