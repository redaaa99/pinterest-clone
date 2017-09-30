import React, { PropTypes } from 'react';
import Router from 'react-router';
import Auth from '../modules/Auth';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style={
    width: "25%",
    padding: "10px",
    margin: "10px"
}

const stylePadd={
    padding: "2px"
}

const userStyle={
  textAlign: "center",
  fontSize: "15pt"
}

const ImageCard = ({imageData,profile,id,refreshPage,refreshPageExplore,addLike}) => {

  function handleLike(){
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/like/'+id);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        addLike(id,xhr.response.message);
        } else {
        console.log(xhr.response);
      }
    });
    xhr.send();
  }
  function handleDelete(){
    const xhr = new XMLHttpRequest();
    xhr.open('delete', '/api/image/'+id);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        if(!profile)
        {
          refreshPageExplore();
        }
        else {
          refreshPage();
        }
        } else {
        console.log(xhr.response.message);
      }
    });
    xhr.send();
  }
  function handleUser(){
    console.log(id);
  }
  if(profile){
     var deleteButt = (<FlatButton label="Delete" onClick={handleDelete}/>);
  }
  return(
  <Card style={style}>
    <CardMedia>
      <img src={imageData.url} alt="" />
    </CardMedia>
    <CardTitle onClick={handleUser} style={{padding: "2px",userSelect: "none",fontSize: "12pt",fontWeight:"bold",cursor:"pointer"}} title={imageData.owner}/>
    <CardTitle style={stylePadd} title={imageData.title}/>
    <CardText style={stylePadd}>
     {imageData.description}
    </CardText>
    <CardActions style={stylePadd}>
      <FlatButton primary={imageData.likes.indexOf(imageData.owner)>=0} label={imageData.likes.length+" Likes"} onClick={handleLike} />
      {deleteButt}
    </CardActions>
  </Card>
)};

// ImageCard.propTypes = {
//   handleLike : PropTypes.func.isRequired,
//   handleUser : PropTypes.func.isRequired,
//   handleDelete: PropTypes.func.isRequired
// };

export default ImageCard;
