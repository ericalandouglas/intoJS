
function checkUsersValid(goodUsers) {
    return function allUsersValid(submittedUsers) {
        return submittedUsers.every(function (subUser) {
            return goodUsers.some(function (gUser) {
                return gUser['id'] === subUser['id'];
            });
        });
    };
}

module.exports = checkUsersValid
