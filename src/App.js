import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';

import VideoCard from './components/VideoCard';
import StreamPartyMenu from './components/StreamPartyMenu';

import { yt_requestAPI, data_array } from './VideosData';

import './App.css';

class App extends React.Component {

  state = {
    loading: true,
    VideoCardList: []
  }

  componentDidMount(){
    yt_requestAPI()
    .then(() => {
      let holder = [];

      for(let i = 0; i < data_array.length; i++){
        holder.push(<VideoCard 
                      key={data_array[i].id} 
                      id={data_array[i].id} 
                      title={data_array[i].title} 
                      views={data_array[i].views}
                      next_goal={data_array[i].next_goal}
                      percentage={data_array[i].percentage}
                    />)
      }
      this.setState({VideoCardList: holder}); 
    })
    .then(() => {
      this.setState({loading: false});
    });
  }

  render(){
    let holder;

    if(this.state.loading){
      holder = (
        <div> 
          <Spinner animation="border" variant="light">
                    <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>      
      );
    }
    else{
      holder = [...this.state.VideoCardList];
      holder.sort((a, b) => b.props.percentage - a.props.percentage);
    }   

    return (
      <div className="App">
        <Row id="header">
          <Col xs="3" className="col">
            <img src="./assets/logo-white.png" alt=""></img>
          </Col>
          <Col xs="6" className="col">
            <h1> Proximas Metas! </h1>
          </Col>
          <Col xs="3" className="col">
            <StreamPartyMenu name="Stream Party!"/>
          </Col>          
        </Row>
        <div id="main-part">
         {holder}
        </div>          
      </div>
    );
  }  
}

export default App;
