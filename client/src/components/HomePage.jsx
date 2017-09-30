import React from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/action/input';
import { Link } from 'react-router';


const HomePage = () => (
  <div id="image">
    <div id="title" >
    Share Your moments!<br/>Appreciate other people&#39;s moments<br/>Start here:
    <br/>
    <Link to="/login">
      <FloatingActionButton>
        <ContentAdd />
      </FloatingActionButton>
    </Link>
    </div>
  </div>
);

export default HomePage;
