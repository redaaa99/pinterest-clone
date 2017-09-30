import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';
import Explore from '../components/Explore.jsx';

class ExplorePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state= {
      secretData : {}
    };
    this.refreshPageExplore = this.refreshPageExplore.bind(this);
    this.addLike = this.addLike.bind(this);
  }

  addLike(id,newArrOfLikes){
    console.log(newArrOfLikes);
    var nextState = this.state.secretData;
    for(var i=0;i<nextState.images;i++)
    {
      if(nextState.images[i]._id===id)
      {
        nextState.images[i].likes=newArrOfLikes;
      }
    }
    alert("liked");
    this.setState({secretData: nextState},function(){console.log(this.state.secretData)});
}

  componentDidMount() {
    this.refreshPageExplore();
  }


  refreshPageExplore(){
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/explorer');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        if(this)
        {
          this.setState({secretData: xhr.response});
        }
      } else {
        console.log(xhr.response);
      }
    });
    xhr.send();
  }

  render() {
    return (<Explore
      secretData={this.state.secretData}
      refreshPageExplore={this.refreshPageExplore}
      addLike={this.addLike}
      />);
  }

}

export default ExplorePage;
