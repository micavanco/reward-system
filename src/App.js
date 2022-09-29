import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import { PurchaseHistoryService } from './services/PurchaseHistoryService';
import Table from './components/table/Table';
import Spinner from './components/spinner/Spinner';

import './App.css';

function App() {
    const [loading, setLoading] = useState(false);
    const [tableRows, setTableRows] = useState([]);
    const [tableHeader, setTableHeader] = useState([]);

    useEffect(() => {
        setLoading(true);
        PurchaseHistoryService.subscribePurchaseHistory().then(response => {
            setLoading(false);
            setTableHeader(() => ([ ...PurchaseHistoryService.getDataKeys(response) ]));
            setTableRows(() => ([ ...PurchaseHistoryService.transformDataToRows(response) ]));
        }).catch(error => error);
        return () => {};
    }, []);

  return (
    <div className="app">
      <Header/>
      <div className="app__container">
          <h2>List of Transactions</h2>
          {
              !loading && tableHeader.length > 0 && tableRows.length > 0 && (
                  <Table tableHeader={tableHeader} tableRows={tableRows}/>
              )
          }
          {
              loading && <Spinner/>
          }
      </div>
    </div>
  );
}

export default App;
