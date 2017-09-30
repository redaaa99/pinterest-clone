import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ImageCard from './Image.jsx';

const style={
  marginLeft : "20px"
};


const Dashboard = ({ onChange,handleOpen,handleClose,handleSubmit,open,image,errors,secretData,refreshPage,addLike }) => {
  const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={handleSubmit}
      />,
    ];
    var arr;
    if(!isEmpty(secretData))
    {
      arr = secretData.images.map((element,index)=>(<ImageCard
        key={index}
        id={element._id}
        profile={secretData.profile}
        imageData={element}
        refreshPage={refreshPage}
        addLike={addLike}
        />));
    }
return(
  <Card className="container">
      <CardTitle
      title="Your Images"/>
      <div>
        <FloatingActionButton secondary={true} onClick={handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add a new image"
          modal={false}
          actions={actions}
          open={open}
          onRequestClose={handleClose}
        >
          <TextField
            hintText="Title"
            floatingLabelText="Title"
            name="title"
            onChange={onChange}
            errorText={errors.title}
            value={image.title}
          />
          <br />
          <TextField
            hintText="URL"
            floatingLabelText="URL"
            name="url"
            onChange={onChange}
            errorText={errors.url}
            value={image.url}
          />
          <br />
          <TextField
            hintText="Description"
            floatingLabelText="Description"
            multiLine={true}
            name="description"
            rows={2}
            onChange={onChange}
            errorText={errors.description}
            value={image.description}
          />
          <br />
        </Dialog>
      </div>
    <div id="userImages">
      {arr}
    </div>
</Card>
)};

Dashboard.propTypes = {
  onChange : PropTypes.func.isRequired,
  handleOpen : PropTypes.func.isRequired,
  handleSubmit : PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
  handleClose : PropTypes.func.isRequired,
  // handleLike : PropTypes.func.isRequired,
  // handleUser : PropTypes.func.isRequired,
  //handleDelete: PropTypes.func.isRequired
};

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

export default Dashboard;
