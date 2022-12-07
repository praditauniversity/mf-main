import React from "react";

const PieChart = () => {
  return (
    <div className="bg-white flex mx-auto items-center flex-col rounded-lg h-full'">
      Pie Chart
      <div className="card-header-actions">
        <a href="http://www.chartjs.org" className="card-header-action">
          <small className="text-muted">docs</small>
        </a>
      </div>
      <div className="chart-wrapper">
        {/* <Pie data={pie} /> */}
        <h1 className="text-base">Berhasil</h1>
      </div>
    </div>
  );
};

export default PieChart;
