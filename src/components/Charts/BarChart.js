import { Chart as ChartJS, BarElement, CategoryScale } from "chart.js";
import React, { useState, useEffect } from "react";

import { Bar } from "react-chartjs-2";
import { getAllCompanies } from "../../api/functions/companies";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

const BarChart = () => {
  const [companies, setCompanies] = useState(null);
  const [companyID, setCompanyID] = useState(null);

  // Fetch company data
  useEffect(() => {
    async function fetchData() {
      const res = await getAllCompanies();
      if (res.data) {
        setCompanies(res.data.companies);
        // setProducts(res.data.data.companies._id);
        console.log(
          " res.data.data.companies._id ",
          res.data.data.companies._id
        );
      }
    }
    fetchData();
  }, []);

  const data = {
    labels: companies?.map((item) => item.company_name), // companies
    datasets: [
      {
        label: "Looping tension",
        data: companies?.map((item) => item.products.length), // products
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
