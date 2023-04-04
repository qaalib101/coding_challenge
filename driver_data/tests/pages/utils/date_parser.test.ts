import { formatDate } from '../../../src/pages/utils';

// create test for formatDate function in date_parser.ts
describe('formatDate', () => {
    it('should return a date in the format of mm/dd/yyyy', () => {
        // create a date
        const date = new Date('01-01-2020');
        // call the formatDate function
        const formattedDate = formatDate(date);
        // expect the formatted date to be 1/1/2020
        expect(formattedDate).toEqual('01/01/2020');
    });
});
