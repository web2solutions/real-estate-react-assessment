import { useContext, useEffect, useState } from 'react';
import { PropertiesContextData  } from '../PropertiesContext';

import PropertiesListingItem from './PropertiesListingItem';

import {ReactComponent as LoadinSVG} from "../loading.svg";

function PropertiesListing () {
    const [ bedOptions, setBedOptions ] = useState([]);
    const [ bathOptions, setBathOptions ] = useState([]);
    const [ parkOptions, setParkOptions ] = useState([]);

    const [ selectedBed, setSelectedBed ] = useState('');
    const [ selectedBath, setSelectedBath ] = useState('');
    const [ selectedPark, setSelectedPark ] = useState('');

    const [ maxPrice, setMaxPrice ] = useState(0);
    const [ minPrice, setMinPrice ] = useState(0);
    const [ maxAllowedPrice, setMaxAllowedPrice ] = useState(0);
    const { properties } = useContext(PropertiesContextData);

    function handleSelectBed(event) {
      setSelectedBed(event.target.value);
    } 

    function handleSelectBath(event) {
      setSelectedBath(event.target.value);
    }

    function handleSelectPark(event) {
      setSelectedPark(event.target.value);
    } 


    function minPriceOnInput (event) {
      console.log(event, event.target.value);
      setMinPrice(+event.target.value);
    }

    function maxPriceOnInput (event) {
      console.log(event, event.target.value);
      setMaxPrice(+event.target.value);
    }

    function setFilterData(properties) {
      const nBeds = [];
      const nBaths = [];
      const nParking = [];
      let maxAllowprice = 0; // Sale Price
      for(const property of properties) {
        if(nBeds.indexOf(property.Bedrooms) === -1) nBeds.push(property.Bedrooms);
        if(nBaths.indexOf(property.Bathrooms) === -1) nBaths.push(property.Bathrooms);
        if(nParking.indexOf(property.Parking) === -1) nParking.push(property.Parking);
        if(property["Sale Price"] > maxAllowprice) maxAllowprice = property["Sale Price"];
      }
      setBedOptions(nBeds.toSorted());
      setBathOptions(nBaths.toSorted());
      setParkOptions(nParking.toSorted());
      setMaxAllowedPrice(maxAllowprice)
    }

    function doFiltering() {
      console.log({ selectedBed, selectedBath, selectedPark, maxPrice, minPrice })
    }

    useEffect(() => {
        if(properties && properties.length > 0) {
          setFilterData(properties);
        }
    }, [properties]);

    return (
        <div className="container">
          <div className="row ml-1 mr-1">
            
            <div className="col-md-2">
              <label htmlFor="Bedrooms">Bedrooms</label>
              <select className='form-control' id="Bedrooms" value={selectedBed} onChange={handleSelectBed}>
                <option key="" value="">select</option>
                { bedOptions.map(n => <option key={n}>{n}</option>) }
              </select>
            </div>

            <div className="col-md-2">
              <label htmlFor="Bathrooms" className="form-label">Bathrooms</label>
              <select className='form-control' id="Bathrooms" value={selectedBath} onChange={handleSelectBath}>
                <option key="" value="">select</option>
                { bathOptions.map(n => <option key={n}>{n}</option>) }
              </select>
            </div>

            <div className="col-md-2">
              <label htmlFor="Parking" className="form-label">Parking</label>
              <select className='form-control' id="Parking" value={selectedPark} onChange={handleSelectPark}>
                <option key="" value="">select</option>
                { parkOptions.map(n => <option key={n}>{n}</option>) }
              </select>
            </div>

            <div className="col-md-4 pt-2">
              <div className="row">
                <label htmlFor="MinPrice" className="form-label">Min Price</label>
                <input type="range" className="form-range ml-1" id="MinPrice" step="500" max={maxAllowedPrice} value={minPrice} onBlur={ minPriceOnInput } />
                <small>{(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(minPrice))}</small>
              </div>
              <div className="row">
                <label htmlFor="MaxPrice" className="form-label">Max Price</label>
                <input type="range" className="form-range ml-1" id="MaxPrice" step="500" max={maxAllowedPrice} value={maxPrice} onChange={ maxPriceOnInput } />
                <small>{(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(maxPrice))}</small>
              </div>
            </div>

            <div className="col-md-2 pt-3">
              <button className="btn btn-outline-primary btn-lg btn-block" onClick={doFiltering}>search</button>
            </div>
            
          </div>
          <div className="row mt-5">
            { 
              properties.length > 0 
                ? 
                  properties.map(property => <PropertiesListingItem key={property.Id} property={ property } />) 
                :
                  <div className="col text-center bg-light">
                    <LoadinSVG style={{
                      width: 100 + 'px',
                      height: 100 + 'px',
                      margin: '20px',
                      display: 'inline-block',
                    }} />
                  </div>
              }
          </div>
        </div>
    )
}

export default PropertiesListing;