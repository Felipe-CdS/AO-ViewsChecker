import React from 'react';
import VideoCard from './components/VideoCard';
import { Spinner } from 'react-bootstrap';

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
                    />);
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
      holder = (<Spinner animation="border" variant="light">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>);
    }
    else{
      holder = [...this.state.VideoCardList];
      holder.sort((a, b) => b.props.percentage - a.props.percentage);
    }   

    return (
      <div className="App">
        <div id="header">
          <img src="./assets/logo-white.png" alt=""></img>
          <h1> Proximas Metas! </h1>
        </div>
        <div id="main-part">
         {holder}
        </div>          
      </div>
    );
  }  
}

export default App;
