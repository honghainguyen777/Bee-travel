import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import "./Auth.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey, faSignInAlt, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import logo from '../nav/logo_transparent.png';
import { login, register, closeRegisterModal, switchModalAction } from '../../actions';


class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmation: "",
      firstName: "",
      lastName: "",
      email: "",
      messagePW: "",
      messageEmail: ""
    };
    this.regexPW = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    this.regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.switchModal = this.switchModal.bind(this);
  }

  handleClose() {
    this.props.closeRegisterModal();
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { username, password, firstName, lastName, email, confirmation } = this.state;
    // if (!username || !password || !firstName || !lastName || !email || !confirmation) {
    //   this.setState({ message: "can not be empty"});
    //   return;
    // }
    if (password !== confirmation) {
      this.setState({ messagePW: "Passwords do not match!"});
      return;
    }
    if (!this.regexPW.test(password)) {
      this.setState({ messagePW: "Password is not strong (at least 6 chars, one number, one lowercase and one uppercase letter!"});
      return;
    }
    if (this.regexEmail.test(email)) {
      this.setState({ messageEmail: "Please provide a valid email"});
      return;
    }
    this.props.register(username, password, firstName, lastName, email, confirmation);
    this.setState({ username: "", password: "", firstName: "", lastName: "", email: "", confirmation: ""});
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value, messagePW: "", messageEmail: ""});
  }

  switchModal() {
    this.props.switchModalAction("register");
  }

  render() {
    console.log(this.props.message);
    const messageError = (
      <div className="alert alert-warning alert-dismissible fade show text-center" id="register-failed" role="alert">
        <strong>{this.props.message}</strong>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );

    return (
      <>
        {/* <Button variant="primary" onClick={this.handleShow}>
          <FontAwesomeIcon icon={faSignInAlt} />
          <span className="md-hidden d-inline"> Log In</span>
        </Button> */}
        <Modal
          show={this.props.isModalOpen}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <div className="header-box w-100 d-flex justify-content-center flex-column align-items-center pl-4">
              <Modal.Title>Register Form</Modal.Title>
              <img className="logo-auth" src={logo} alt="logo-bee-travel"/>
            </div>
          </Modal.Header>
          <Modal.Body>
            {this.props.message ? messageError : null}
            <form onSubmit={this.handleFormSubmit} className="login-form ml-5 mr-5" id="signupForm">
            <div className="form-row">
              <div className="col-md-6 input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text field-icon"><FontAwesomeIcon icon={faUser} /></span>
                </div>
                <input onChange={this.handleChange} value={this.state.firstName} type="text" className="form-control" name="firstName" placeholder="First Name" required />
              </div>
              <div className="col-md-6 input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text field-icon"><FontAwesomeIcon icon={faUser} /></span>
                </div>
                <input onChange={this.handleChange} value={this.state.lastName} type="text" className="form-control" name="lastName" placeholder="Last Name" required />
              </div>
              <div className="col-md-12 input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text field-icon"><FontAwesomeIcon icon={faUserPlus} /></span>
                </div>
                <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control" name="username" placeholder="Username" minLength={6} required />
              </div>
              <div className="col-md-6 input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text field-icon"><FontAwesomeIcon icon={faKey} /></span>
                </div>
                <input onChange={this.handleChange} value={this.state.password} type="password" name="password" className="form-control" placeholder="Password" required />
              </div>
              <div className="col-md-6 input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text field-icon"><FontAwesomeIcon icon={faKey} /></span>
                </div>
                <input onChange={this.handleChange} value={this.state.confirmation} type="password" name="confirmation" className="form-control" placeholder="Confirmation" required />
              </div>
              {this.state.messagePW ? <div className="alert alert-warning col-md-12 text-center" role="alert">{this.state.messagePW}</div> : null}
              <div className="col-md-12 input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text field-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                </div>
                <input type="email" name="email" className="form-control" placeholder="Your email" required />
              </div>
            </div>
            {this.state.messageEmail ? <div className="alert alert-warning col-md-12 text-center" role="alert">{this.state.messageEmail}</div> : null}
            <div className="justify-content-center pb-2 text-center">
              <input type="checkbox" className="mr-3" required />I agree to the term of use
            </div>
            <div className="form-group text-center">
              <button type="submit" className="btn btn-register">Register</button>
            </div>
          </form>









{/* 






            <form onSubmit={this.handleFormSubmit} className="login-form ml-5 mr-5" id="loginForm">
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-user field-icon"></i></span>
                </div>
                <input onChange={this.handleChange} value={this.state.username} type="text" className="form-control" name="username" placeholder="username" required />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i class="fa fa-key field-icon"></i></span>
                </div>
                <input onChange={this.handleChange} value={this.state.password} type="password" name="password" className="form-control" placeholder="password" required />
              </div>
              <div class="form-group text-center mb-0">
                <button className="btn btn-login">Log In</button>
              </div>
            </form> */}
          </Modal.Body>
          <div className="row m-0 p-0">
          <div className="col-4">
            <hr />
          </div>
          <div className="col-4 text-center">
            <p>Have Account?</p>
          </div>
          <div className="col-4">
            <hr />
          </div>
        </div>
        <div className="d-flex justify-content-center">
        {/* <SignupModal /> */}
        <button type="button" onClick={this.switchModal} className="btn btn-secondary btn-login mb-3">Login</button>
        </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.auth.messageRegister,
    isModalOpen: state.auth.is_register_modal
  };
}

export default connect(mapStateToProps, { login, register, closeRegisterModal, switchModalAction})(RegisterModal);

{/* <div class="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="signupModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Register Form</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div id="messageSignup"></div>
          <form onsubmit="signup(); return false" method="post" id="signupForm">
            <div class="form-row">
              <div class="col-md-6 input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
                </div>
                <input type="text" class="form-control" name="firstName" placeholder="First Name" required>
              </div>
              <div class="col-md-6 input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
                </div>
                <input type="text" class="form-control" name="lastName" placeholder="Last Name" required>
              </div>
              <div class="col-md-12 input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-user-plus"></i></span>
                </div>
                <input type="text" class="form-control" name="username" placeholder="Username" minlength="3" required>
              </div>
              <div class="col-md-6 input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>
                <input type="password" name="password" class="form-control" placeholder="Password" required>
              </div>
              <div class="col-md-6 input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-key"></i></span>
                </div>
                <input type="password" name="confirmation" class="form-control" placeholder="Confirmation" required>
              </div>
              <div class="col-md-12 input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                </div>
                <input type="email" name="email" class="form-control" placeholder="Your email" required>
              </div>
            </div>
            <div class="justify-content-center pb-2 text-center">
              <input type="checkbox" class="mr-3" required>I agree to the term of use
            </div>
            <div class="form-group text-center">
              <button type="submit" class="btn btn-login">Register</button>
            </div>
          </form>
        </div>
        <div class="row m-0 p-0">
          <div class="col-4">
            <hr>
          </div>
          <div class="col-4">
            <p class="text-center">Or</p>
          </div>
          <div class="col-4">
            <hr>
          </div>
        </div>
        <form class="text-center">
          <button type="button" class="btn btn-secondary btn-register mb-3" data-dismiss="modal" data-toggle="modal" data-target="#loginModal">Login</button>
        </form>
      </div>
    </div>
  </div> */}