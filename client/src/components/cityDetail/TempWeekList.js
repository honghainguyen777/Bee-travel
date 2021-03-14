import React from 'react';
import { connect } from "react-redux";

class TempWeekList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {

    }
    render(){
        const tempList = !this.props.temps7Days ? null : this.props.temps7Days.days_letters.map((day, index) => {
            // index = Number(index);
            let status = (index === 0) ? "active" : "";
            return (
                <li key={index} className={status}>
                    <img className="day-icon" src={this.props.temps7Days.icons[index]} alt={this.props.temps7Days.weathers[index]} />
                    <span className="day-name">{day}</span>
                    <span className="day-temp">{Math.round(this.props.temps7Days.tempsNight[index])}°C</span>
                </li>
            )
        });
        return(
            <ul className="week-list mt-0" id="week-list">
                {tempList}
            </ul>
        )
    }
}

const mapStateToProps = state => {
    console.log("in tempweek: ", state)
    const { temps7Days, message } = state.city;
    return { temps7Days, message };
}
  
export default connect(mapStateToProps, null)(TempWeekList);