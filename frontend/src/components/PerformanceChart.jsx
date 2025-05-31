import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    CategoryScale,
    Legend,
    Filler,
} from "chart.js";
import useTrackingStore from "../store/useTrackingStore";
import { useEffect } from "react";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    CategoryScale,
    Legend,
    Filler
);

function PerformanceChart({ setWpm }) {
    const trackingArray = useTrackingStore((state) => state.trackingArray);

    const labels = trackingArray.map((_, i) => `${i}s`);
    const avgWPM = [];
    const incorrectPoints = [];
    let totalCorrect = 0;

    trackingArray.forEach((entry, i) => {
        const currCorrect = entry.correctChars;
        totalCorrect += currCorrect;
        const currAvgWPM = (totalCorrect / 5 / (i + 1)) * 60;

        avgWPM.push(Number(currAvgWPM.toFixed(2)));

        if (entry.inCorrectChars > 0) {
            incorrectPoints.push({
                x: `${i}s`,
                y: 0,
            });
        }
    });

    useEffect(() => {
        if (avgWPM.length > 0) {
            setWpm(avgWPM[avgWPM.length - 1].toFixed(0));
        }
    }, [avgWPM, setWpm]);

    const data = {
        labels,
        datasets: [
            {
                label: "Average",
                data: avgWPM,
                borderColor: "rgba(139, 92, 246, 1)",
                backgroundColor: "rgba(139, 92, 246, 0.08)",
                fill: true,
                tension: 0.3,
            },
            {
                label: "Incorrect Entries",
                data: incorrectPoints,
                type: "scatter",
                showLine: false,
                pointStyle: "crossRot",
                pointBackgroundColor: "rgba(239, 68, 68, 1)",
                pointBorderColor: "rgba(239, 68, 68, 1)",
                pointRadius: 6,
                pointHoverRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: "index",
                intersect: false,
            },
        },
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time (s)",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Words Per Minute (WPM)",
                },
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
}

export default PerformanceChart;
