import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import optionsRadial from "./chart";
import './radialChart.css';

export default class RadialBarChart extends React.Component{
  render(){
    return (
      <div className="rounded-xl shadow-sm bg-white py-6 px-12">
        <div>
          <div className="pt-4 pb-0 flex justify-between">
            <p className="text-sm ">Project Progress</p>
            <p className="text-sm ">Last Month</p>
          </div>
          <div className="pt-1 pb-4 flex justify-start">
            <p className="text-xl font-semibold ">71</p>
            <p className="text-xs opacity-70 align-text-bottom">00 %</p>
          </div>
        </div>
  
        {/* disini harusnya radial chart */}
        <div className="py-4">
          {/* dibawah ini harusnya make class yang manggil dari cssnya */}
          <figure id="highcharts-figure-radial">
            <div id="container-radial">
              <HighchartsReact highcharts={Highcharts} options={optionsRadial}/>
            </div>
            {/* <div w3-include-html="index.html"></div> */}
          </figure>
        </div>
        <div className="py-4 flex justify-end">
          <button className="font-semibold text-sm text-secondary">
            Detail Project Overview
          </button>
        </div>
      </div>
    );

  }
}