import ReactApexChart from "react-apexcharts";
import useDashboardData from "../../../hooks/admin/useDashboardData";

const LineChart = () => {
  const { userData, postData } = useDashboardData();

  const series = [
    {
      name: "Posts",
      data: postData && postData,
    },
    {
      name: "Users",
      data: userData && userData,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options: any = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Post & Users Line Chart",
      align: "center",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default LineChart;
