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
      let a = [3];
      a[0] = data_array[i];      
      a[1] = <VideoCard key={data_array[i]} title_id={data_array[i]} onChange={this.eventhandler}/>;
      a[2] = -1; //Percentage
      holder.push(a);
    }
    this.setState({VideoCardList: holder});
  }

  eventhandler = (data) => {
    let state_list = this.state.VideoCardList;
    let searched_id = data[0];
    let percentage = data[1];  
    let all_percentage_calculated = true;

    for (let i = 0; i < state_list.length; i++) {
      if(searched_id === state_list[i][0]){        
        state_list[i][2] = percentage;
      }  
      if(state_list[i][2] !== -1)      
        all_percentage_calculated = false;    
    } 

    if(!all_percentage_calculated){
      state_list = state_list.sort((a, b) => b[2] - a[2]);
    }    

    this.setState({VideoCardList: state_list});
  };

  render(){
    let holder = [];

    for (let i = 0; i < (this.state.VideoCardList).length; i++) {
      holder.push(this.state.VideoCardList[i][1]);
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
