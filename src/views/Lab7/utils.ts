import {ChartData} from "chart.js";

export function fromMapToChartDataset(map: Map<number, number>, label = "f(x)"): ChartData{
    return {
        labels: Array.from(map.keys()),
        datasets: [
            {
                label,
                data: Array.from(map.values()),
                borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                fill: false,
            }
        ]
    }
}