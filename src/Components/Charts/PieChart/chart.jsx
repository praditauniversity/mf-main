import './donutChart.css';

const optionDonut = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    text: null,
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: false,
        // distance: 0,
        // style: {
        //   fontWeight: 'bold',
        //   color: 'white'
        // }
      },
      startAngle: 0,
      endAngle: 360,
      size: '30%',
    }
  },
  legend: {
    layout: 'vertical',
    align: 'left',
    verticalAlign: 'middle',
    itemMarginTop: 5,
    itemMarginBottom: 5,
  //   labelFormatter: function () {
  //     return this.name + ' (click to hide)';
  // }
  },
  series: [{
    showInLegend: true,
    colorByPoint: true,
    innerSize: '50%',
    data: [{
      name: 'Todo',
      y: 50
    },  {
      name: 'In Progress',
      y: 25
    },  {
      name: 'Done',
      y: 25
    }]
  }]
};

export default optionDonut;
