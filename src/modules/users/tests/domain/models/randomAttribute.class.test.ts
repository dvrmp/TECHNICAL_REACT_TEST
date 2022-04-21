import RandomAttribute from '../../../domain/models/randomAttribute.class';

describe('MODULE: USERS | Class: RandomAttribue', () => {
    test('Method: generateJob, should return an some jobs "Doctor", "RRHH", "Teacher", "Programmer", "Boxer"', () => {
        const availiablesJobs = ['Doctor', 'RRHH', 'Teacher', 'Programmer', 'Boxer'];
        const randomJob = RandomAttribute.generateJob();
        expect(availiablesJobs.includes(randomJob) === true).toBeTruthy();
    });
    test('Method: generateCreatedAt, should return and random date on: 2022:(1 - 12)', () => {
        const availablesMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic'];
        const randomDate = RandomAttribute.generateCreatedAt();
        randomDate.split(' ').forEach(element => {
            if(availablesMonths.includes(element)) {
                expect(availablesMonths.includes(element) === true).toBeTruthy();         
            }
        });
    });
})
