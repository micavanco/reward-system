import { RewardSystemHelper } from './RewardSystemHelper';

test('should return correct statistics', () => {
    const mockedData = [{"id":2,"firstName":"Kikelia","lastName":"Palfrie","product":"Octinoxate and Oxybenzone","price":259,"date":"11/08/2022"}];
    const expectedResult = [[{
            id: undefined,
            firstName: undefined,
            lastName: undefined,
            lastMonth: 0,
            twoMonthsAgo: 0,
            threeMonthsAgo: 0,
            totalPoints: 0
        }], [[0, 'Kikelia', 'Palfrie', 0, 368, 0, 368]]]

    expect(RewardSystemHelper.getRewardPointsStatistics(mockedData)).toEqual(expectedResult);
});

test('should return correctly formatted data', () => {
    const mockedData = '11/08/2022';
    const expectedResult = '2022-08-11';

    expect(RewardSystemHelper.getFormattedDate(mockedData)).toEqual(expectedResult);
});

test('should be inside date range', () => {
    const IN_SECOND_MONTH_RANGE_MS = 2_829_800_000;
    const mockedData = new Date(new Date().getTime() - IN_SECOND_MONTH_RANGE_MS).toISOString().split('T')[0];

    expect(RewardSystemHelper.filterByMonthAgo(mockedData, 2)).toEqual(true);
});

test('should get correct number of points', () => {
    const mockedPrice = 120;

    expect(RewardSystemHelper.getPointsFromPrice(mockedPrice)).toEqual(90);
});

test('should correctly fill object with data and points', () => {
    const mockedArray = [{ firstName: 'Mock', lastName: 'JohnMock', price: 120 }];
    const mockedObject = {};
    const expectedResult = {'Mock|JohnMock': {
            firstName: 'Mock',
            lastName: 'JohnMock',
            mockedKey: 90
        }};

    RewardSystemHelper.fillObjectWithUsersPointsFromArray(mockedArray, mockedObject, 'mockedKey');

    expect(mockedObject).toEqual(expectedResult);
});

test('should set total number of points to object', () => {
    const mockedObject = {'Mock|JohnMock': {
            firstName: 'Mock',
            lastName: 'JohnMock',
            lastMonth: 1,
            twoMonthsAgo: 2,
            threeMonthsAgo: 3
        }};
    const expectedResult = {'Mock|JohnMock': {
            ...mockedObject['Mock|JohnMock'],
            total: 6
        }};

    RewardSystemHelper.setTotalNumberToObject(mockedObject);

    expect(mockedObject).toEqual(expectedResult);
});

test('should return correct object', () => {
    const mockedObject = {
        firstName: 'Mock',
        lastName: 'JohnMock',
        lastMonth: 1,
        twoMonthsAgo: 2,
        threeMonthsAgo: 3,
        total: 2
    };
    const expectedResult = {
      ...mockedObject,
        totalPoints: 2
    };
    delete expectedResult.total;

    expect(RewardSystemHelper.mapToResultObject(mockedObject)).toEqual(expectedResult);
});
