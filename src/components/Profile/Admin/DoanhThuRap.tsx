import axios from 'axios';
import { useEffect, useState } from 'react';
import type { doanhthu } from '../../../types/type';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler // để fill dưới line
);

export const DoanhThuRap = () => {
  const [datas, setDatas] = useState<doanhthu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://backendformoviebooking-production.up.railway.app/api/Cinema/GetDoanhThuRap");
        setDatas(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };
    fetchData();
  }, []);

  const labels = datas.map(d => d.name);

  // Tạo gradient cho thanh bar
  const createBarGradient = (ctx: CanvasRenderingContext2D, area: { top: number, bottom: number }) => {
    const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.8)');
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.3)');
    return gradient;
  };

  const data:any = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d')!;
    const gradient = createBarGradient(ctx, { top: 0, bottom: canvas.height });

    return {
      labels,
      datasets: [
        {
          type: "bar" as const,
          label: "Số vé bán",
          data: datas.map(d => d.quantity),
          backgroundColor: gradient,
          borderRadius: 6,
          maxBarThickness: 40,
          hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
        },
        {
          type: "line" as const,
          label: "Doanh thu",
          data: datas.map(d => d.totalPrice),
          borderColor: "rgba(255, 99, 132, 0.9)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
          borderWidth: 3,
          yAxisID: 'y1',
        },
      ],
    };
  };

  const options:any = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { font: { size: 14, weight: '600' } }
      },
      title: {
        display: true,
        text: "Số vé & Doanh thu theo rạp",
        font: { size: 20, weight: 'bold' },
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 13, weight: '600' } },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: { color: '#e0e0e0' },
        ticks: {
          font: { size: 12 },
          color: '#555',
        },
        title: {
          display: true,
          text: 'Số vé bán',
          font: { size: 14, weight: '600' }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: {
          font: { size: 12 },
          color: 'rgba(255, 99, 132, 0.9)',
          callback: function(value: number) {
            return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
          }
        },
        title: {
          display: true,
          text: 'Doanh thu (VND)',
          font: { size: 14, weight: '600' }
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20, backgroundColor: '#f9f9f9', borderRadius: 12, boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30, fontWeight: '700', color: '#222' }}>Doanh Thu Rạp Theo Các Tháng</h1>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};
