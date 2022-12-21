import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import optionDonut from "./chart";
import './donutChart.css';

export default class DonutChart extends React.Component{
  render(){
    return (
      <div className="rounded-xl shadow-sm bg-white py-6 px-12">
        <div>
          <div className="pt-4 pb-0 flex justify-between">
            <p className="text-sm ">Task Overview</p>
          </div>
        </div>
        <div className="py-0">
        <HighchartsReact highcharts={Highcharts} options={optionDonut}/>
        </div>
      </div>
    );

  }
}