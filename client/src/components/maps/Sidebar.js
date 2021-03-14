import "./Sidebar.css";
import React from "react";

class Sidebar extends React.Component {
    // ({ width, height, children }) =>
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            xPosition: -props.width
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }
//   const [xPosition, setX] = React.useState(-width);

  toggleMenu () {
      console.log(this.state.xPosition);
    if (this.state.xPosition < 0) {
      this.setState({xPosition: 0});
    } else {
      this.setState({xPosition: -this.props.width});
    }
  }

  componentDidUpdate() {
    if (this.props.letSideBarClose) {
        if (this.state.xPosition === 0) {
            console.log("closed");
            this.props.isSideBarClosed();
            this.toggleMenu ();
        } else {
            this.toggleMenu ();
        }
    }
    if (this.props.letSideBarOpen) {
        if (this.state.xPosition < 0) {
            console.log("opened");
            this.props.isSideBarOpened();
            this.toggleMenu ();
        } else {
            this.toggleMenu ();
        }
    }
  }

  componentDidMount() {
      this.setState({xPosition: -this.props.width});
  }

  render() {
    return (
        <React.Fragment>
          <div
            className="side-bar"
            style={{
              transform: `translatex(${this.state.xPosition}px)`,
              width: `${this.props.width}px`,
              minHeight: this.props.height
            }}
          >
            <div className="content pb-5 mb-1">{this.props.children}</div>
          </div>
          <div
              onClick={this.toggleMenu}
              className="toggle-menu d-flex justify-content-center align-items-center"
              style={{
                transform: `translatex(${this.state.xPosition + this.props.width}px)`
              }}
            ><span className="text-in-menu">View Cites</span></div>
        </React.Fragment>
      );
  }
};

export default Sidebar;