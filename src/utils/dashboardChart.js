import Chart from 'chart.js/auto';


export const setDashboardChart = (labels , datapoints)=>{
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'فروش ماه',
                data: datapoints,
                borderColor: "#0062ff",
                fill: true,
                cubicInterpolationMode: 'monotone',
                tension: 0.4
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'نمودار فروش یک سال گذشته'
                },
            },
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: " زمان سرف شده"
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: ' میلیون تومان'
                    },
                    // suggestedMax: 200,
                    // suggestedMin: -10,
                }
            }
        },
    };

  const ctx = document.getElementById('myChart').getContext('2d');
  const chartItem =Chart.getChart("myChart")
  if(chartItem)chartItem.destroy()
  const chart = new Chart(ctx , config)

}