import React from "react";
import "./Navbar.css";
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import logo from './logo_transparent.png';
import { openRegisterModal, openLoginModal } from '../../actions';
import { connect } from 'react-redux';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
  }

  openModal(modal) {
    if (modal === "register") {
      this.props.openRegisterModal();
    } else {
      this.props.openLoginModal();
    }
  }

  render() {
    return (
      <div className="nav-bar">
        <nav className="navbar navbar-expand-md navbar-light bg-warning">
            <a className="navbar-brand" href="/">
              <img className="d-inline logo-image" src={logo} alt="logo-bee-travel" />
              <span className="blue d-inline brand-name"> Bee Travel</span>
            </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mr-3">
                <LoginModal />
                <RegisterModal />
                <button onClick={() => this.openModal("register")}>Register</button>
                <button onClick={() => this.openModal("login")}>Login</button>
              </li>
            </ul>
          </div>
          {/* <ul className="nav-bar-ul">
            <li>
              <a href="/"> Bee-Travel</a>
              
            </li>
          </ul> */}
        </nav>
      </div>
    );
  }
}

// export default Navbar;
export default connect(null, { openRegisterModal, openLoginModal })(Navbar);
