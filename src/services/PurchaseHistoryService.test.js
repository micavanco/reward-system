import { waitFor } from '@testing-library/react';
import MOCK_DATA from '../assets/data/MOCK_DATA.json';
import { PurchaseHistoryService } from './PurchaseHistoryService';

test('should return purchase list', async () => {
    PurchaseHistoryService.errorState = false;
    await waitFor(
        PurchaseHistoryService.getPurchaseHistory.bind(PurchaseHistoryService.errorState)
        , { timeout: 5000 }
    ).then(data => {
        expect(data).toEqual(MOCK_DATA);
    });
});

test('should transform data to rows',() => {
    const mockedData = [{ mock1: 1, mock2: 2 }];
    const expectedResult = [[1, 2]];

    expect(PurchaseHistoryService.transformDataToRows(mockedData)).toEqual(expectedResult);
});

test('should get data keys',() => {
    const mockedData = [{ mockFirst: 1, mockSecond: 2 }];
    const expectedResult = ['mock first', 'mock second'];

    expect(PurchaseHistoryService.getDataKeys(mockedData)).toEqual(expectedResult);
});

test('should transform to header name',() => {
    const mockedData = 'mockFirst';
    const expectedResult = 'mock first';

    expect(PurchaseHistoryService.transformHeaderName(mockedData)).toEqual(expectedResult);
});
