const contacts = [
    {
        _id: '6053813c233be106f4429dea',
        name: "Test1",
        phone: "0951234567",
        email: "test1@test.com",
        subscription: "free",
    },
    {
        _id: "6053813c233be106f4429deb",
        name: "Test2",
        phone: "0951234568",
        email: "test2@test.com",
        subscription: "free",
    },
    {
        _id: "6053813c233be106f4429dec",
        name: "Test3",
        phone: "0951234569",
        email: "test3@test.com",
        subscription: "free",
    },
];

const newContact = {
    email: "andray838@gmail.com",
    name: "Andray",
    phone: "0951111111",
};

const User = {
    _id: "6053813c233be106f4429dec",
    name: "Guest",
    subscription: "free",
    token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTM4MTNjMjMzYmUxMDZmNDQyOWRlYyIsImlhdCI6MTYxNjA4NTM0MSwiZXhwIjoxNjE2MDkyNTQxfQ.4LnQvh80t6OB6gD2RnI6kOwOmcXpPa7MoqKkONkwh2I",
    email: "test@test.com",
    password: "$2a$08$qkXmsF4r1p8OVcluN1RNBOeGZcFMn.DSM5ubXYQ8z4cUm.y.d4EnG",
    avatar: "https://s.gravatar.com/avatar/b642b4217b34b1e8d3bd915fc65c4452?s=250",
};

const users = [];
users[0] = User;

const newUser = { email: "newtest@newtest.com", password: "12345" };

module.exports = { contacts, newContact, User, users, newUser };