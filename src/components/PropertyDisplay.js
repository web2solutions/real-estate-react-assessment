import { useContext, useEffect, useMemo, useState } from 'react';
import { PropertiesContextData  } from '../PropertiesContext';
import { UserContextData  } from '../UserContext';
import { useParams, Link } from 'react-router-dom';

import PropertyDisplayHeader from './PropertyDisplayHeader';
import PropertyDisplayPhotoForm from './PropertyDisplayPhotoForm';


function PropertyDisplay () {
  const { Id } = useParams();
  const { properties } = useContext(PropertiesContextData);
  const { user, setUser, addToWishList, removeFromWishList } = useContext(UserContextData);
  const [property, setProperty] = useState(false);

  function getProperty () {
    const property = properties.filter(property => {
      if(+property.Id === (+Id)) {
        return true;
      }
      return false;
    })[0] || false;
    
    setProperty(property);
    return property;
  }

  useMemo(() => {
    getProperty();
    console.log(property)
  }, [properties])

    return (
      <div className="container">
          
            { property ? 
              <>
                <PropertyDisplayHeader user={user} setUser={setUser} addToWishList={addToWishList} removeFromWishList={removeFromWishList} property={property} Id={Id} />

                <PropertyDisplayPhotoForm property={property} Id={Id} />
              </>
            : '' }
      </div>
    )
}

export default PropertyDisplay;