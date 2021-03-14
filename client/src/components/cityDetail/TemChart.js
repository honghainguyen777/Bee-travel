import React from "react";
import { fetch7DayForcast } from "../../actions";
import { connect } from "react-redux";
import "./City.css";
import Chart from 'chart.js';

class TemChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetch7DayForcast(this.props.cityId);
  }

  componentDidUpdate() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      data: {
        labels: this.props.temps7Days.days,
        datasets: [{ 
            data: this.props.temps7Days.tempsDay,
            label: "Day",
            borderColor: "#3e95cd",
            backgroundColor: "#7bb6dd",
            fill: false,
          },
          { 
            data: this.props.temps7Days.tempsNight,
            label: "Night",
            borderColor: "#3cba9f",
            backgroundColor: "#71d1bd",
            fill: false,
          },
        ]
      },
      options: {
        responsive: true,
        legend: {
            position: 'left',
            labels: {
                fontColor: "white",
                boxWidth: 20,
                padding: 20
            }
        }
      }
    });
  }

  render() {
    return(
      <canvas id="tempChart" className="p-3" width="500" height="200" ref={this.chartRef}></canvas>
    );
  }
}

const mapStateToProps = state => {
  console.log("in forcast: ", state)
  const { temps7Days, message } = state.city;
  return { temps7Days, message };
}

export default connect(mapStateToProps, { fetch7DayForcast })(TemChart);