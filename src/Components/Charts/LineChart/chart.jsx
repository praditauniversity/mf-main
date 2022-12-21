import './lineChart.css';

const optionLine = {
  chart: {
    type: 'spline'
  },
  title: {
    text: null
  },
  subtitle: {
    text: null
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    accessibility: {
      description: 'Months of the year'
    }
  },
  // yAxis: {
  //   title: {
  //     text: 'Temperature'
  //   },
  //   labels: {
  //     formatter: function () {
  //       return this.value + '°';
  //     }
  //   }
  // },
  tooltip: {
    crosshairs: true,
    shared: true
  },
  plotOptions: {
    spline: {
      // marker: {
      //   radius: 4,
      //   lineColor: '#666666',
      //   lineWidth: 1
      // }
    }
  },
  series: [{
    name: 'Manpower',
    data: [40, 80, 120, 70, 100, 120, 90, 150, 200, 180, 160, 140]

  }, 
  // {
  //   name: 'Actual',
  //   data: [20, 20, 45, 60, 39, 52, 79, 82, 120, 110, 100, 90]
  // }
]
};

export default optionLine;
