import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import './columnChart.css';
import optionColumn from "./chart";

export default class ColumnChart extends React.Component{
  render(){
    return (
      <div className="rounded-xl shadow-sm bg-white py-6 px-12">
        <div>
          <div className="pt-4 pb-0 flex justify-between">
            <p className="text-sm ">Total Project Expenditure</p>
            <p className="text-sm ">Solar Panel Smart Lab</p>
          </div>
          {/* <div className="pt-1 pb-4 flex justify-start">
            <p className="text-xl font-semibold ">45%</p>
            <p className="text-xs opacity-70 align-text-bottom">02%</p>
          </div> */}
        </div>
  
        {/* disini harusnya radial chart */}
        <div className="py-10">
        <HighchartsReact highcharts={Highcharts} options={optionColumn}/>
          {/* dibawah ini harusnya make class yang manggil dari cssnya */}
        </div>
        <div className="py-4 flex justify-end">
          <button className="font-semibold text-sm text-secondary">
            Total Project Expenditure Details
          </button>
        </div>
      </div>
    );

  }
}