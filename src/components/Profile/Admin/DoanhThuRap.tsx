import axios from 'axios';
import { useEffect, useState } from 'react';
import type { doanhthu } from '../../../types/type';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  const labels = datas.map(data => data.name);

  const data = {
    labels,
    datasets: [
      {
        label: 'Số Lượng Vé',
        data: datas.map(data => data.quantity),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Doanh Thu (VNĐ)',
        data: datas.map(data => data.totalPrice),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options:ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Số vé & Doanh thu theo rạp" },
  },
};
  ChartJS.defaults.color = '#000'; 

  return (
    <div>
      <h1>Doanh Thu Rạp Theo Các Tháng</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
