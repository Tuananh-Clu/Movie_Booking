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

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'react-chartjs-2';

// Đăng ký tất cả module + plugin datalabels
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartDataLabels
);

export const DoanhThuRap = () => {
  const [datas, setDatas] = useState<doanhthu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backendformoviebooking-production.up.railway.app/api/Cinema/GetDoanhThuRap"
        );
        setDatas(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Đang tải dữ liệu...</p>;
  if (!datas.length) return <p style={{ textAlign: 'center' }}>Không có dữ liệu để hiển thị.</p>;

  const labels = datas.map((d) => d.name);

  const data:any = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Số vé bán',
        data: datas.map((d) => d.quantity),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderRadius: 8,
        maxBarThickness: 40,
        hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
        datalabels: {
          anchor: 'end',
          align: 'top',
          color: '#222',
          font: { weight: '600', size: 12 },
        },
      },
      {
        type: 'line' as const,
        label: 'Doanh thu',
        data: datas.map((d) => d.totalPrice),
        borderColor: 'rgba(255, 99, 132, 0.9)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        fill: true,
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 8,
        borderWidth: 3,
        yAxisID: 'y1',
        datalabels: {
          color: '#f55',
          font: { weight: '600', size: 11 },
          formatter: (value: number) =>
            value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
          anchor: 'end',
          align: 'top',
        },
      },
    ],
  };

  const options:any = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      datalabels: {
        display: true,
      },
      legend: {
        position: 'top' as const,
        labels: { font: { size: 14, weight: '600' }, color: '#222' },
      },
      title: {
        display: true,
        text: 'Doanh Thu Rạp Theo Các Tháng',
        font: { size: 22, weight: '700' },
        color: '#222',
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        enabled: true,
        mode: 'nearest',
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.75)',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 13, weight: '600' }, color: '#444' },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: { color: '#eee', borderDash: [5, 5] },
        ticks: { font: { size: 12 }, color: '#666' },
        title: { display: true, text: 'Số vé bán', font: { size: 14, weight: '600' }, color: '#444' },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: {
          font: { size: 12 },
          color: '#f55',
          callback: (value: number) =>
            value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        },
        title: { display: true, text: 'Doanh thu (VND)', font: { size: 14, weight: '600' }, color: '#f55' },
      },
    },
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: '0 auto',
        padding: 25,
        backgroundColor: '#fff',
        borderRadius: 14,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        color: '#222',
      }}
    >
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};
