import React from 'react';

import { data_array } from './VideosData';

import './App.css';

import VideoCard from './components/VideoCard';

class App extends React.Component {

  state = {
    VideoCardList: []
  }

  componentDidMount(){
    var holder = [];

    for(let i = 0; i < data_array.length; i++){
      holder.push(<VideoCard key={data_array[i]} title_id={data_array[i]}/>);
    }

    this.setState({VideoCardList: holder});
  }

  render(){
    return (
      <div className="App">
        <div id="header">
          <img src="./assets/logo-white.png" alt=""></img>
          <h1> Proximas Metas! </h1>
        </div>
        <div id="main-part">
          {this.state.VideoCardList}        
        </div>          
      </div>
    );
  }  
}

export default App;
