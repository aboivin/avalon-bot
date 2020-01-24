const join = require('./join');
const host = require('./host');
const start = require('./start');
const { playerTags } = require('../game/state');

const message = name => ({
    author: name,
    react: jest.fn()
});

it('should not join if there is no hosted game', () => {
    expect(playerTags).toHaveLength(0);

    join.execute(message('Alice'));

    expect(playerTags).toHaveLength(0);
});

it('should join a hosted game', () => {
    host.execute(message('Alice'));
    join.execute(message('Alice'));

    expect(playerTags).toHaveLength(1);

    join.execute(message('Bob'));
    expect(playerTags).toHaveLength(2);

    join.execute(message('Connor'));
    join.execute(message('Connor'));
    expect(playerTags).toHaveLength(3);
});

it('should not join if the game is already started', () => {
    host.execute(message('Alice'));
    join.execute(message('Bob'));
    join.execute(message('Connor'));
    join.execute(message('Dave'));
    join.execute(message('Edith'));
    expect(playerTags).toHaveLength(5);

    start.execute(message('Alice'));
    join.execute(message('Frank'));
    expect(playerTags).toHaveLength(5);
});
