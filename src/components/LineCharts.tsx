import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useRef } from 'react';

interface LineChartsProps {
  labels: string[];
  data: number[];
}

const LineCharts = ({ labels, data }: LineChartsProps) => {
    const ref = useRef(null);
    const options: any = {
      tension: 0.3,
      pointHitRadius: 20,
      pointRadius: 5,
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        subtitle: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          usePointStyle: true,
          titleFont: {
            size: 15
          },
          bodyFont: {
            size: 20
          },
          displayColors: false,
          backgroundColor: 'rgb(9, 9, 10)',
          callbacks: {
            title: (tooltipItem: any) => `disponível em ${tooltipItem[0].label}`,
            label: (tooltipItem: any) => {
              const formatedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tooltipItem.raw);
              return ` ${formatedValue}`;
            },
          },
        },
      },
    };

    const datasets = {
      labels: labels,
      datasets: [
        {
          label: 'disponível',
          data: data,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgb(16, 185, 129)',
        },
      ],
    };
    return (
      <div className="mt-[-55px] px-4">
        <Line ref={ref} options={options} data={datasets} />
      </div>
    );
  }
;

export default LineCharts;
