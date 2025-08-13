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
import { Pie, PolarArea } from 'react-chartjs-2';

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
    title: { display: true, text: 'Doanh Thu Của Rạp Theo Tháng' },
  },
};
const dat:any = {
    labels,
    datasets: [
      {
        label: 'Số lượng vé',
        data: datas.map((d) => d.quantity),
         backgroundColor: scale,
         hoverBackgroundColor: hove,
        },
    ],
  };
  
const option:any = {
  responsive: true,
  plugins: {
    legend: { position: 'right' },
    title: { display: true, text: 'Số Lượng Vé Đã Bán' },
  },
};


  

  return (
    <div>
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
      <div>
              <PolarArea data={data} options={options} />
              <Pie data={dat} options={option} />
      </div>
    </div>
    </div>
  );
};
