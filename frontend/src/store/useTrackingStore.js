import { create } from "zustand";

const useTrackingStore = create((set, get) => ({
    trackingArray: [],
    trackTiming: (currTime, isCorrect, timeThreshold) => {
        const arr = [...get().trackingArray];

        // Setting inverse index for limited time practice
        const indexToUpdate = timeThreshold
            ? timeThreshold - currTime
            : currTime;

        // Push empty objects for each time interval in the array
        while (arr.length <= currTime) {
            arr.push({ correctChars: 0, inCorrectChars: 0 });
        }

        // Update objects in currentIndec
        if (isCorrect) arr[indexToUpdate].correctChars += 1;
        else arr[indexToUpdate].inCorrectChars += 1;

        set({ trackingArray: arr });
    },
    resetTracking: () => set({ trackingArray: [] }),
}));

export default useTrackingStore;
