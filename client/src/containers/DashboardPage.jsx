import { hashHistory } from 'react-router';
import Auth from '../modules/Auth';
import React, { PropTypes } from 'react';
import Dashboard from '../components/Dashboard.jsx';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';



class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      image: {
        title: '',
        url: '',
        description: ''
      },
      secretData : {},
      open: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.addLike = this.addLike.bind(this);

  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    this.refreshPage();
  }

  addLike(id,newArrOfLikes){
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

  refreshPage(){
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
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

  handleOpen(){
   this.setState({open: true});
  };

  handleClose(){
   this.setState({open: false});
  };

  handleSubmit(event){
    event.preventDefault();
    this.setState({open: false});
    const title = encodeURIComponent(this.state.image.title);
    const url = encodeURIComponent(this.state.image.url);
    const description = encodeURIComponent(this.state.image.description);
    const formData = `title=${title}&url=${url}&description=${description}`;

    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/image');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success
        // change the component-container state

        this.setState({
          errors: {}
        });
        this.refreshPage();
        // make a redirect
      } else {
        // failure

        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;

        this.setState({
          errors
        });
        console.log(this.state.errors);
      }
    });
    xhr.send(formData);


  }

  onChange(event)  {
    const field = event.target.name;
    const image = this.state.image;
    image[field] = event.target.value;

    this.setState({
      image
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (<Dashboard
      input={this.state.input}
      onChange={this.onChange}
      handleOpen={this.handleOpen}
      handleClose={this.handleClose}
      handleSubmit={this.handleSubmit}
      open={this.state.open}
      image={this.state.image}
      errors={this.state.errors}
      secretData={this.state.secretData}
      refreshPage={this.refreshPage}
      addLike={this.addLike}
       />);
  }

}


export default DashboardPage;
