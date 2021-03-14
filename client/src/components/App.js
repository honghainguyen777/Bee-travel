import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Mapbox from './maps/Mapbox';
import Navbar from './nav/Navbar';
import "./App.css";
import City from './cityDetail/City';
import Memory from './memories/Memory';
import Gallery from './cityGallery/Gallery';

const Home = () => <h1>Home Page</h1>;
const Search = () => <h1>Search</h1>;
// const Memory = () => <h1>Memory</h1>;
// const CityDetail = () => <h1>CityDetail</h1>;
// const FavoriteCity = () => <h1>FavoriteCity</h1>;


class App extends React.Component {
    // constructor(props) {
    //     state={
    //         user: null,
    //     }
    // }
    async componentDidMount() {
        this.props.fetchUser();
        // this.props.login();
        // const response = await this.props.fetchUser();
        // this.setState(() => { user: response})
    }
    render() {
        return(
            <div className="app-container">
                <Navbar />
                <BrowserRouter>
                    <div className="content-container">
                        <Route exact path="/" component={Home} />
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/map" component={Mapbox} />
                        <Route exact path="/memories/:id" component={Memory} />
                        <Route exact path="/gallery" component={Gallery} />
                    </div>
                    <div className="content-container-overscreen">
                        <Route exact path="/details/:id" component={City} />
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

// first agurment of the connect is reserved for mapStateToProps function
// actions now is assigned to the App component as props
export default connect(null, actions)(App);