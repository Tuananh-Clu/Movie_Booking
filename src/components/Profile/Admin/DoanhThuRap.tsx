import axios from "axios";
import { useEffect, useState } from "react";
import type { doanhthu } from "../../../types/type";
import chroma from "chroma-js";

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
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie, PolarArea } from "react-chartjs-2";

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

  if (loading)
    return <p className="text-center text-white">Đang tải dữ liệu...</p>;
  if (!datas.length)
    return <p className="text-center text-white">Không có dữ liệu để hiển thị.</p>;

  const scale = chroma.scale(["#00bcd4", "#ff4081"]).mode("lch").colors(datas.length);
  const hover = scale.map((c: string) => chroma(c).brighten(1).hex());
  const labels = datas.map((d) => d.name);

  const doanhThuData: any = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: datas.map((d) => d.totalPrice),
        backgroundColor: scale,
        hoverBackgroundColor: hover,
      },
    ],
  };

  const veData: any = {
    labels,
    datasets: [
      {
        label: "Số lượng vé",
        data: datas.map((d) => d.quantity),
        backgroundColor: scale,
        hoverBackgroundColor: hover,
      },
    ],
  };

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { color: "#fff" },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-6 font-sans text-white">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Doanh thu */}
        <div className="bg-white/5 backdrop-blur rounded-2xl shadow-lg p-6 ring-1 ring-white/10">
          <h2 className="text-lg font-semibold mb-4 text-center text-cyan-300">
            Doanh Thu Của Rạp Theo Tháng
          </h2>
          <PolarArea data={doanhThuData} options={options} />
        </div>

        <div className="bg-white/5 backdrop-blur rounded-2xl shadow-lg p-6 ring-1 ring-white/10">
          <h2 className="text-lg font-semibold mb-4 text-center text-pink-300">
            Số Lượng Vé Đã Bán
          </h2>
          <Pie data={veData} options={options} />
        </div>
      </div>
    </div>
  );
};
