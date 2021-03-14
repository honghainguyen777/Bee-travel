import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import "./Mapbox.css";
import { fetchTop10Cities, fetchCities, fetchFavoriteCities, addFavoriteCity, deleteFavoriteCity } from '../../actions';
import Search from './Search';
import Sidebar from './Sidebar';
import empty_heart from './empty_heart.png';
import heart from './heart.png';
import { v4 as uuidv4 } from 'uuid';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = 'pk.eyJ1Ijoiam5yZG1ubiIsImEiOiJja2wxN3VtY28zaDdlMm5xbjV5Znh0YnBpIn0.s0Cz8vhJe3T1N2wvocwFzw';




class Mapbox extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          query: "",
          contentContainerWidth: 0,
          letSideBarClose: false,
          letSideBarOpen: false,
          searched: false
      };
      this.generateMarker = this.generateMarker.bind(this);
      this.divGenerator = this.divGenerator.bind(this);
      this.mapLookup = this.mapLookup.bind(this);
      this.mapDragTo = this.mapDragTo.bind(this);
      this.favoriteSubmit = this.favoriteSubmit.bind(this);
      this.closeSideBar = this.closeSideBar.bind(this);
      this.openSideBar = this.openSideBar.bind(this);
      this.isSideBarClosed = this.isSideBarClosed.bind(this);
      this.isSideBarOpened = this.isSideBarOpened.bind(this);
      this.map = null;
      this.markers = [];
      this.markersForFavorite = [];
      this.mapContainer = React.createRef();
      this.contentContainer = React.createRef();
  }

  // refactor these functions into toggle ones later
  closeSideBar() {
    this.setState({letSideBarClose: true, searched: false});
  }

  openSideBar() {
    this.setState({letSideBarOpen: true});
  }

  isSideBarClosed() {
    this.setState({letSideBarClose: false});
  }

  isSideBarOpened() {
    this.setState({letSideBarOpen: false, searched: true});
  }


  generateMarker(longitude, latitude, map, color, cityId) {
    if (color==="red") {
      if (this.isFavorite(cityId).check) return;
    }
    const marker = new mapboxgl.Marker({
      scale: 1,
      color: color,
    })
      .setLngLat([longitude, latitude])
      .addTo(map);
    this.markers.push(marker);
  }
  
  mapLookup(event) {
      event.preventDefault();
      const { long, lat } = event.target
      this.map.flyTo({center: [Number(long.value), Number(lat.value)], zoom: 9});
  }

  mapDragTo(coord) {
      console.log(coord)
      this.map.flyTo({center: coord, zoom: 9});
  }

  removeAllPreviousMarkers() {
      this.markers.forEach(marker => marker.remove());
  }

  favoriteSubmit(event) {
    event.preventDefault();
    const cityId = event.target.cityId.value;
    const index = event.target.index.value;

    console.log("favorite city id: ", cityId, "at index: ", index);
    if (index) {
      this.props.deleteFavoriteCity(cityId, Number(index));
    } else {
      this.props.addFavoriteCity(cityId);
    }

  }

  isFavorite(cityId) {
    let index;
    let favorite = this.props.favoriteCities ? this.props.favoriteCities.filter((favoriteCity, i) => {
      if (favoriteCity._id === cityId) {
        index = i;
        return true;
      }
      return false;
    }) : [];
    return {check: favorite.length === 0 ? false : true, index};
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
        container: this.mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [13.4, 13.4], // starting position [lng, lat]
        zoom: 1, // starting zoom
        doubleClickZoom: true,
      });
    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-right');
    this.props.fetchTop10Cities();
    this.props.fetchFavoriteCities();
    let contentContainerWidth = this.contentContainer.current.offsetWidth;
    if (contentContainerWidth < 1000) {
      contentContainerWidth = 1000;
    }
    this.setState({contentContainerWidth: contentContainerWidth});
  }

  divGenerator (city) {
    let favorite = this.isFavorite(city._id);
    return (
      <div key={uuidv4()} className={`card-city row ml-3 mr-1 mt-3`}>
        <div className="city-header w-100 d-flex justify-content-between align-items-center px-3 py-1">
          <Link className="city-header-name" to={`/details/${city._id}`}><h4>{city.name}</h4></Link>
          <form onSubmit={this.favoriteSubmit}>
            <input type="hidden" name="cityId" value={city._id}/>
            <input type="hidden" name="index" value={favorite.index}/>
            <button className="button-hidden" ref="submitBtn">
              {!favorite.check ? <img className="heart" src={empty_heart} alt="empty heart"/> : <img className="heart" src={heart} alt="heart"/>}
            </button>
          </form>
        </div>
        <div className="city-body px-3 w-100">
          <p className="m-0">Country: {city.country}</p>
          <p className="m-0">Population: {city.population} people</p>
        </div>
        <div className="d-flex justify-content-end align-items-center w-100">
            <form onSubmit={this.mapLookup}>
                <input type="hidden" name="long" value={city.loc.coordinates[0]}/>
                <input type="hidden" name="lat" value={city.loc.coordinates[1]}/>
                <button className="button-removed" >View on Map</button>
            </form>
          <Link to={`/details/${city._id}`} className="button-removed">City Weather</Link>
        </div>
      </div>
    );
  }

  render() {
      return(
          <div className=" m-2" className="container-city" ref={this.contentContainer}>
            <Search closeSideBar={this.closeSideBar} openSideBar={this.openSideBar}/>
            { !this.state.contentContainerWidth ? null :
              <Sidebar 
                isSideBarClosed={this.isSideBarClosed}
                isSideBarOpened = {this.isSideBarOpened}
                letSideBarClose={this.state.letSideBarClose}
                letSideBarOpen={this.state.letSideBarOpen}
                width={this.state.contentContainerWidth * 0.4}
                height={"100vh"}>
                { this.props.searched && this.state.searched ? this.mapDragTo(this.props.cities[0].loc.coordinates) : ""}
                { this.props.searched ? this.removeAllPreviousMarkers() : "" }
                {!this.props.cities || !this.map ? "" : this.props.cities.map((city) => {
                    this.generateMarker(city.loc.coordinates[0], city.loc.coordinates[1], this.map, "red", city._id);
                    return this.divGenerator(city);
                })};
                {!this.props.favoriteCities ? "" : this.props.favoriteCities.forEach(city => {
                  this.generateMarker(city.loc.coordinates[0], city.loc.coordinates[1], this.map, "green");
                })}
            </Sidebar>
            }
            <div id='map' ref={this.mapContainer} className="pl-0"></div>
          </div>
      )
  }
}


const mapStateToProps = state => {
  console.log(state);
    return { cities: state.map.cities, searched: state.map.searched, favoriteCities: state.favorite.favoriteCities };
}

// export default Mapbox;
export default connect(mapStateToProps, { fetchTop10Cities, fetchCities, fetchFavoriteCities, addFavoriteCity, deleteFavoriteCity })(Mapbox);