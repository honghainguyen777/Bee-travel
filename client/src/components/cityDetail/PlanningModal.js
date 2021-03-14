import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import "./City.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import logo from '../nav/logo_transparent.png';
import { submitVisitedForm, cityFormRedirect } from '../../actions';
import { Redirect } from 'react-router'

class PlanningModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fromDate: new Date(),
        toDate: new Date(),
        travellersNum: 0,
        budget: 0,
        preferences: "",
        show: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClose() {
    this.setState({show: false});
  }

  handleShow() {
      this.setState({show: true});
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const stateCopy = {...this.state};
    stateCopy.fromDate = new Date(stateCopy.fromDate);
    stateCopy.toDate = new Date(stateCopy.toDate);
    this.props.submitVisitedForm({...stateCopy, cityId: this.props.cityId});
    this.setState({
        fromDate: new Date(),
        toDate: new Date(),
        travellersNum: 0,
        cost: 0,
        summary: "",
        rating: 5,
        show: false
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState(() => ({ [name]: value}));
  }

  componentWillUnmount() {
      this.props.cityFormRedirect();
  }

  render() {
    if (this.props.cityFormSuccess) return (<Redirect to={`/memories/${this.props.memory_id}`} />);
    return (
      <>
        <Button className="m-3" variant="success" onClick={this.handleShow}>
            <FontAwesomeIcon icon={faRoute} />
          <span className="md-hidden d-inline"> Not Yet? Plan to Visit (Again)</span>
        </Button>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <div className="header-box w-100 d-flex justify-content-center flex-column align-items-center pl-4">
              <Modal.Title>Visited Form - First Step</Modal.Title>
              <img className="logo-auth" src={logo} alt="logo-bee-travel"/>
            </div>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleFormSubmit} className="login-form ml-3 mr-3">
                <div class="form-group row p-1 m-0">
                <label htmlFor="travellersNum" class="col-8 col-form-label p-0">Number of Travellers</label>
                <div className="col-4">
                <input onChange={this.handleChange} value={this.state.travellersNum} className="form-control" min={0} name="travellersNum" type="number" id="travellersNum" required />
                </div>
            </div>
            <div className="form-group row p-1 m-0">
                <label htmlFor="budget" className="col-7 col-form-label p-0">Your budget (€)</label>
                <div className="col-5">
                <input onChange={this.handleChange} value={this.state.budget} className="form-control" min={0} name="budget" type="number" id="budget" placeholder="100 €" required />
                </div>
            </div>
            <div className="form-group row p-1 m-0">
                <label htmlFor="fromDate" className="col-3 col-form-label p-0">From Date: </label>
                <div className="col-9">
                <input onChange={this.handleChange} value={this.state.from} className="form-control" name="fromDate" type="date" id="fromDate" required />
                </div>
            </div>
            <div className="form-group row p-1 m-0">
                <label htmlFor="toDate" className="col-3 col-form-label p-0">To Date: </label>
                <div className="col-9">
                <input onChange={this.handleChange} value={this.state.to} className="form-control" name="toDate" type="date" id="toDate" required />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="preferences">Preferences/Activites</label>
                <textarea onChange={this.handleChange} value={this.state.preferences} className="form-control" name="preferences" id="preferences" rows="2"></textarea>
            </div>
            {/* <input type="hidden" name="image" value="{{imageUrl}}" /> */}
            <div className="form-group text-center">
                <button type="submit" className="btn btn-login">Add new plan</button>
            </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
    const {cityFormSuccess, memory_id} = state.city;
    console.log(cityFormSuccess)
  return {
    cityFormSuccess,
    memory_id
  };
}

export default connect(mapStateToProps, { submitVisitedForm, cityFormRedirect })(PlanningModal);