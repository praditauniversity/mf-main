import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import './donutChart.css';
import optionDonutv2 from "./chart";

export default class DonutChartV2 extends React.Component{
  render(){
    return (
      <div className="rounded-xl shadow-sm bg-white py-6 px-12">
        <div>
          <div className="pt-4 pb-0 flex justify-between">
            <p className="text-sm ">Project by Financial Health</p>
          </div>
        </div>
        <div className="py-0">
        <HighchartsReact highcharts={Highcharts} options={optionDonutv2}/>
        </div>
      </div>
    );

  }
}