const { UserModalStructure } = require('../models/UserModal');
const { v4: uuidv4 } = require('uuid');

const usersStaticData = [
    {
        [UserModalStructure.id]: uuidv4(),
        [UserModalStructure.firstName]: 'FakeOneFirstName',
        [UserModalStructure.lastName]: 'FakeOneLastName',
        [UserModalStructure.email]: 'fakeOne@exmaple.com',
    },
    {
        [UserModalStructure.id]: uuidv4(),
        [UserModalStructure.firstName]: 'FakeTwoFirstName',
        [UserModalStructure.lastName]: 'FakeTwoLastName',
        [UserModalStructure.email]: 'fakeTwo@exmaple.com',
    },
    {
        [UserModalStructure.id]: uuidv4(),
        [UserModalStructure.firstName]: 'FakeThreeFirstName',
        [UserModalStructure.lastName]: 'FakeThreeLastName',
        [UserModalStructure.email]: 'fakeThree@exmaple.com',
    },
    {
        [UserModalStructure.id]: uuidv4(),
        [UserModalStructure.firstName]: 'FakeFourFirstName',
        [UserModalStructure.lastName]: 'FakeFourLastName',
        [UserModalStructure.email]: 'fakeFour@exmaple.com',
    },
    {
        [UserModalStructure.id]: uuidv4(),
        [UserModalStructure.firstName]: 'FakeFiveFirstName',
        [UserModalStructure.lastName]: 'FakeFiveLastName',
        [UserModalStructure.email]: 'fakeFive@exmaple.com',
    },
];

module.exports = { usersStaticData };
