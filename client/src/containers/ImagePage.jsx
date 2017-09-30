import React, { PropTypes } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import ImageCard from '../components/Image.jsx';



class ImagePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state= {

    };
  }

  render() {
    return (<ImageCard
      secretData={this.state.secretData}
      refreshPageExplore={this.refreshPageExplore}
      />);
  }

}

export default ExplorePage;
