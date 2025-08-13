import axios from 'axios';
import { useEffect, useState } from 'react';
import type { doanhthu } from '../../../types/type';
import chroma from 'chroma-js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
   ArcElement,
   RadialLinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(
   ArcElement,
   RadialLinearScale,
  CategoryScale,
  LinearScale,
  BarController,  
  BarElement,
  LineController,  
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
  const scale = chroma.scale(['#00bcd4', '#ff4081']).mode('lch').colors(datas.length);
  const hove=scale.map((color:string)=>chroma(color).brighten(1).hex());  
  const labels = datas.map((d) => d.name);

  const data:any = {
    labels,
    datasets: [
      {
        label: 'Doanh thu',
        data: datas.map((d) => d.totalPrice),
         backgroundColor: scale,
         hoverBackgroundColor: hove,
        },
    ],
  };
  
const options:any = {
  responsive: true,
  plugins: {
    legend: { position: 'right' },
    title: { display: true, text: 'Polar Area Chart Example' },
  },
};

  

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: 25,
        backgroundColor: '#fff',
        borderRadius: 14,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        color: '#222',
      }}
    >
      <PolarArea data={data} options={options} />
    </div>
  );
};
