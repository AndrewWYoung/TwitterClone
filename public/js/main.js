// Thank You: Nikolay Ivanov from Stack Overflow
// http://stackoverflow.com/questions/2136647/character-countdown-like-on-twitter
function limitTextCount(limitField_id, limitCount_id, limitNum) {
    var limitField = document.getElementById(limitField_id);
    var limitCount = document.getElementById(limitCount_id);
    var fieldLEN = limitField.value.length;

    if (fieldLEN > limitNum) {
        limitField.value = limitField.value.substring(0, limitNum);
    } else {
        limitCount.innerHTML = (limitNum - fieldLEN) + ' charachter(s) to go.';
    }
}