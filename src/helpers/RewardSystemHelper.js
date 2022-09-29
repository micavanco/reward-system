import {
    HIGH_THRESHOLD,
    LOW_THRESHOLD,
    NUMBER_OF_POINTS_FOR_ABOVE_HIGH_THRESHOLD,
    NUMBER_OF_POINTS_FOR_LOW_RANGE,
    ONE_MONTH_MS
} from '../consts/RewardSystemConst';

export class RewardSystemHelper {

    static getRewardPointsStatistics(data) {
        if (!data) {
            return [];
        }

        const users = {};
        const transformedArray = data.map(item => ({ ...item, date: this.getFormattedDate(item.date) }));
        const firstMonthAgoArray = transformedArray.filter(item => this.filterByMonthAgo(item.date));
        const secondMonthAgoArray = transformedArray.filter(item => this.filterByMonthAgo(item.date, 2));
        const thirdMonthAgoArray = transformedArray.filter(item => this.filterByMonthAgo(item.date, 3));

        this.fillObjectWithUsersPointsFromArray(firstMonthAgoArray, users, 'lastMonth');
        this.fillObjectWithUsersPointsFromArray(secondMonthAgoArray, users, 'twoMonthsAgo');
        this.fillObjectWithUsersPointsFromArray(thirdMonthAgoArray, users, 'threeMonthsAgo');
        this.setTotalNumberToObject(users);

        return [[this.mapToResultObject({})], Object.values(users).map(this.mapToResultObject)
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .map(item => Object.values(item))];
    }

    static getFormattedDate(date) {
        const dateArray = date.split('/');

        return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
    }

    static filterByMonthAgo(date, monthsAgo = 1) {
        const dateObjectMS = new Date(date).getTime();
        const startDateMS = new Date().getTime() - (monthsAgo * ONE_MONTH_MS);
        const endDateMS = new Date().getTime() - ((monthsAgo - 1) * ONE_MONTH_MS);

        return (startDateMS <= dateObjectMS) && (endDateMS >= dateObjectMS);
    }

    static getPointsFromPrice(price) {
        if (price < LOW_THRESHOLD) {
            return 0;
        } else if (price < HIGH_THRESHOLD) {
            return (price - LOW_THRESHOLD) * NUMBER_OF_POINTS_FOR_LOW_RANGE;
        } else {
            return ((HIGH_THRESHOLD - LOW_THRESHOLD) * NUMBER_OF_POINTS_FOR_LOW_RANGE)
                + ((price - HIGH_THRESHOLD) * NUMBER_OF_POINTS_FOR_ABOVE_HIGH_THRESHOLD);
        }
    }

    static fillObjectWithUsersPointsFromArray(array, users, key) {
        array.forEach(item => {
            const id = `${item.firstName}|${item.lastName}`;

            if (!users[id]) {
                users[id] = {};
                users[id]['firstName'] = item.firstName;
                users[id]['lastName'] = item.lastName;
            }

            if (!users[id][key]) {
                users[id][key] = 0;
            }

            users[id][key] = users[id][key] + this.getPointsFromPrice(item.price);
        });
    }

    static setTotalNumberToObject(users) {
        for (const user in users) {
            users[user]['total'] = (users[user]['lastMonth'] || 0)
                + (users[user]['twoMonthsAgo'] || 0)
                + (users[user]['threeMonthsAgo'] || 0);
        }
    }

    static mapToResultObject(item, index) {
        return {
            id: index,
            firstName: item.firstName,
            lastName: item.lastName,
            lastMonth: item.lastMonth || 0,
            twoMonthsAgo: item.twoMonthsAgo || 0,
            threeMonthsAgo: item.threeMonthsAgo || 0,
            totalPoints: item.total || 0
        };
    }
}
