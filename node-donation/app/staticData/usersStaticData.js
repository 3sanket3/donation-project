const { v4: uuidv4 } = require('uuid');

const usersStaticData = [
    {
        id: uuidv4(),
        firstName: 'FakeOneFirstName',
        lastName: 'FakeOneLastName',
        email: 'fakeOne@exmaple.com',
    },
    {
        id: uuidv4(),
        firstName: 'FakeTwoFirstName',
        lastName: 'FakeTwoLastName',
        email: 'fakeTwo@exmaple.com',
    },
    {
        id: uuidv4(),
        firstName: 'FakeThreeFirstName',
        lastName: 'FakeThreeLastName',
        email: 'fakeThree@exmaple.com',
    },
    {
        id: uuidv4(),
        firstName: 'FakeFourFirstName',
        lastName: 'FakeFourLastName',
        email: 'fakeFour@exmaple.com',
    },
    {
        id: uuidv4(),
        firstName: 'FakeFiveFirstName',
        lastName: 'FakeFiveLastName',
        email: 'fakeFive@exmaple.com',
    },
];

module.exports = { usersStaticData };
