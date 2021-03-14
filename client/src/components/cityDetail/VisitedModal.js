import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import "./City.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../nav/logo_transparent.png';
import { submitVisitedForm, cityFormRedirect } from '../../actions';
import { Redirect } from 'react-router'

class VisitedModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fromDate: new Date(),
        toDate: new Date(),
        travellersNum: 0,
        cost: 0,
        summary: "",
        rating: 5,
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
        <Button className="m-3" variant="info" onClick={this.handleShow}>
          <FontAwesomeIcon icon={faImages} />
          <span className="md-hidden d-inline"> Visited? Create trip album</span>
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
            <div className="form-group row p-1 m-0">
                <label htmlFor="fromDate" className="col-3 col-form-label p-0">From Date: </label>
                <div className="col-9">
                <input onChange={this.handleChange} value={this.state.fromDate} className="form-control" name="fromDate" type="date" id="fromDate" required />
                </div>
            </div>
            <div className="form-group row p-1 m-0">
                <label htmlFor="toDate" className="col-3 col-form-label p-0">To Date: </label>
                <div className="col-9">
                <input onChange={this.handleChange} value={this.state.toDate} className="form-control" name="toDate" type="date" id="toDate" required />
                </div>
            </div>
            <div className="form-group row p-1 m-0">
                <label htmlFor="travellersNum" className="col-8 col-form-label p-0">Number of Travellers</label>
                <div className="col-4">
                <input onChange={this.handleChange} value={this.state.travellersNum} className="form-control" name="travellersNum" type="number" min={0} id="travellersNum" required />
                </div>
            </div>
            <div className="form-group row p-1 m-0">
                <label htmlFor="cost" className="col-7 col-form-label p-0">Actual Cost (€)</label>
                <div className="col-5">
                <input onChange={this.handleChange} value={this.state.cost} className="form-control" name="cost" type="number" id="cost" required />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="summary">Your short summary about the trip</label>
                <textarea onChange={this.handleChange} value={this.state.summary} className="form-control" name="summary" id="summary" rows="3" required></textarea>
            </div>

            <div className="form-group row">
                <label htmlFor="rating" className="col-8">Rate your trip</label>
                <div className="col-4">
                <select onChange={this.handleChange} value={this.state.rating} className="form-control" name="rating" id="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </div>
            </div>
            <input type="hidden" name="image" value="{{imageUrl}}" />
            <div className="form-group text-center">
                <button type="submit" className="btn btn-city">Submit Your Trip</button>
            </div>
            </form>




            {/* {this.props.message ? messageError : null}
            <form onSubmit={this.handleFormSubmit} className="login-form ml-5 mr-5" id="loginForm">
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-user field-icon"></i></span>
                </div>
                <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control" name="username" placeholder="username" required />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-key field-icon"></i></span>
                </div>
                <input onChange={this.handleChange} value={this.state.password} type="password" name="password" className="form-control" placeholder="password" required />
              </div>
              <div className="form-group text-center mb-0">
                <button className="btn btn-login">Log In</button>
              </div>
            </form> */}
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

export default connect(mapStateToProps, { submitVisitedForm, cityFormRedirect })(VisitedModal);