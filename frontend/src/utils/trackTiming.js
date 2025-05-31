const trackingArray = [];

export function trackTiming(currTime, isCorrect) {
    // If object not pushed for current time stamp;
    while (trackingArray.length <= currTime) {
        trackingArray.push({
            correctChars: 0,
            inCorrectChars: 0,
        });
    }

    if (isCorrect) {
        trackingArray[currTime].correctChars =
            trackingArray[currTime].correctChars + 1;
    } else {
        trackingArray[currTime].inCorrectChars =
            trackingArray[currTime].inCorrectChars + 1;
    }
}
