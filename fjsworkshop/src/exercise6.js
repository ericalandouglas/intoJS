
function countWords(inputWords) {
    return inputWords.reduce(function (counter, word, i, words) {
        if (counter[word] === undefined) {
            counter[word] = 1
        } else {
            counter[word] += 1
        }
        return counter;
    }, {});
}

module.exports = countWords
