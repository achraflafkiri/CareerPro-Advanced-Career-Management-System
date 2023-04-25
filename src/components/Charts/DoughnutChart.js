import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { getOneCompany } from "../../api/functions/companies";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ societeId }) => {
  const [company, setCompany] = useState(null);

  useEffect(() => {
    console.log(societeId);

    const fetchData = async () => {
      const res = await getOneCompany(societeId);
      console.log("data =>", res.data);
      if (res.status === 200) {
        setCompany(res.data.company);
      }
    };

    fetchData();
  }, [societeId]);

  const [commandesPercent, setCommandesPercent] = useState(0);
  const [livraisonsPercent, setLivraisonsPercent] = useState(0);

  useEffect(() => {
    if (company) {
      const commandesCount = company.commandes.length;
      const livraisonsCount = company.livraisons.length;
      const totalCount = commandesCount + livraisonsCount;
      setCommandesPercent((commandesCount / totalCount) * 100);
      setLivraisonsPercent((livraisonsCount / totalCount) * 100);
    }
  }, [company]);

  const data = {
    labels: ["commandes", "livraisons"],
    datasets: [
      {
        label: "",
        data: [commandesPercent, livraisonsPercent],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
