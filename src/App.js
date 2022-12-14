import { useEffect, useState } from 'react';

import Header from './components/header/Header';
import Table from './components/table/Table';
import Spinner from './components/spinner/Spinner';
import ErrorMessage from './components/error-message/ErrorMessage';

import { PurchaseHistoryService } from './services/PurchaseHistoryService';
import { RewardSystemHelper } from './helpers/RewardSystemHelper';

import './App.css';

function App() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tableRawRows, setTableRawRows] = useState([]);
    const [tableRawHeader, setTableRawHeader] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [tableHeader, setTableHeader] = useState([]);

    useEffect(() => {
        if (!error) {
            setLoading(true);
            PurchaseHistoryService.getPurchaseHistory().then(response => {
                setLoading(false);
                setTableRawHeader(() => ([ ...PurchaseHistoryService.getDataKeys(response) ]));
                setTableRawRows(() => ([ ...PurchaseHistoryService.transformDataToRows(response) ]));
                const [statisticsHeader, statistics] = RewardSystemHelper.getRewardPointsStatistics(response);
                setTableHeader(() => ([ ...PurchaseHistoryService.getDataKeys(statisticsHeader) ]));
                setTableRows(() => ([ ...statistics ]));
            }).catch(() => {
                setLoading(false);
                setError(true);
            });
        }
        return () => {};
    }, [error]);

    const onRetry = () => {
        PurchaseHistoryService.errorState = false;
        setError(false);
    };

  return (
    <div className="app">
      <Header/>
      <div className="app__container" role={'application'}>
          {
              !loading && tableHeader.length > 0 && tableRows.length > 0 && (
                  <>
                      <h2>List of Transactions</h2>
                      <Table tableHeader={tableRawHeader} tableRows={tableRawRows} specialKey={'transactions'}/>
                      <h2>List of Statistics</h2>
                      <Table tableHeader={tableHeader} tableRows={tableRows} specialKey={'statistics'}/>
                  </>

              )
          }
          {
              loading && <Spinner/>
          }
          {
              error && <ErrorMessage onRetry={onRetry}/>
          }
      </div>
    </div>
  );
}

export default App;
