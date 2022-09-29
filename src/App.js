import {useEffect, useState} from 'react';
import Header from './components/header/Header';
import { PurchaseHistoryService as Service } from './services/PurchaseHistoryService';

import './App.css';

const PurchaseHistoryService = new Service();

function App() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        PurchaseHistoryService.subscribePurchaseHistory().then(response => {
            setLoading(false);
            console.log(response.length);
            setData(() => ([ ...response ]));
        }).catch(error => error);
        return () => {};
    }, []);

  return (
    <div className="app">
      <Header/>
      <div className="app__container">
          {data.length}
      </div>
    </div>
  );
}

export default App;
