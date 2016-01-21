
function loadUsers(userIds, load, done) {
    var users = [];
    var completed = 0;
    userIds.forEach(function (id, index) {
        load(id, function (user) {
            users[index] = user;
            completed += 1;
            if (completed === userIds.length) {
                done(users);
            }
        });
    });
}

module.exports = loadUsers;

