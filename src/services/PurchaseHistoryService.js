import MOCK_DATA from '../assets/data/MOCK_DATA.json';

export class PurchaseHistoryService {

    static subscribePurchaseHistory() {
        return new Promise((resolve, reject) => setTimeout(() => resolve(MOCK_DATA), 2000));
    }

    static transformDataToRows(data) {
        if (!data) {
            return;
        }

        return data.map(row => Object.values(row));
    }

    static getDataKeys(data) {
        if (!data) {
            return;
        }

        return Object.keys(data[0]).map(this.transformHeaderName);
    }

    static transformHeaderName(name) {
        const transformedHeader = [];

        for (let key of name) {
            if (key.charCodeAt(0) > 64 && key.charCodeAt(0) < 91) {
                transformedHeader.push(' ');
                transformedHeader.push(key.toLowerCase());
            } else {
                transformedHeader.push(key.toLowerCase());
            }
        }

        return transformedHeader.join('');
    }
}
