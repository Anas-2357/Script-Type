import { create } from 'zustand';

const useTrackingStore = create((set, get) => ({
    trackingArray: [],
    trackTiming: (currTime, isCorrect) => {
        const arr = [...get().trackingArray];

        while (arr.length <= currTime) {
            arr.push({ correctChars: 0, inCorrectChars: 0 });
        }

        if (isCorrect) arr[currTime].correctChars += 1;
        else arr[currTime].inCorrectChars += 1;

        set({ trackingArray: arr });
        console.log(arr);
    },
    resetTracking: () => set({ trackingArray: [] })
}));

export default useTrackingStore;
