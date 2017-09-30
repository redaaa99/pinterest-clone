import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import ImageCard from './Image.jsx';


const style={
  marginLeft : "20px"
};

const Explore = ({ secretData,refreshPageExplore,addLike }) => {
  var arr;
  if(!isEmpty(secretData))
  {
    arr = secretData.images.map((element,index)=>(<ImageCard
      key={index}
      id={element._id}
      profile={secretData.profile}
      imageData={element}
      refreshPageExplore={refreshPageExplore}
      addLike={addLike}
      />));
  }
  return(
    <Card className="container">
    <CardTitle
      title="Discover other people's moments"
    />
      <div id="exploreImages">
        {arr}
      </div>
    </Card>
  )};

// Explore.propTypes = {
//   handleLike : PropTypes.func.isRequired,
//   handleUser : PropTypes.func.isRequired,
//   handleDelete: PropTypes.func.isRequired
// };

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

export default Explore;
