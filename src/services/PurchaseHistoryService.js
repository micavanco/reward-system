import MOCK_DATA from '../assets/data/MOCK_DATA.json';

export class PurchaseHistoryService {

    subscribePurchaseHistory() {
        return new Promise((resolve, reject) => setTimeout(() =>
            Boolean(Math.random() * 2) ? resolve(MOCK_DATA) : reject('Something went wrong')
        ));
    }
}
