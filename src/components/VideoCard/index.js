import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import './styles.css';

class VideoCard extends React.Component {   

  constructor(props){
    super(props);

    this.state = {
      id: props.id,
      title: props.title,
      views: 0,
      next_goal: 0,
      percentage: 0,
      thumb_src: `https://i.ytimg.com/vi/${props.id}/sddefault.jpg`
    };   
  } 

  componentDidMount(){
    this.yt_requestAPI().then(this.defineNextGoalAndPercentage);
  }

  yt_requestAPI = async() => {
   var apiString = "https://youtube.googleapis.com/youtube/v3/videos?part=statistics";
    var params = {
      key: process.env.REACT_APP_API_KEY,
      id: this.state.id
    };
    var response = await axios.get(apiString, {params}).then((resp) => resp.data);  
    this.setState({views: response.items[0].statistics.viewCount});
  }  

  //Spotify doesn't give the views counter. So this is implemented but not used
  /*spotify_requestAPI = async() => {
    var auth_api_URL = 'https://accounts.spotify.com/api/token';
    var request_URL ='https://api.spotify.com/v1/tracks/308Ir17KlNdlrbVLHWhlLe';
    var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    var client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

    var headers = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: client_id,
        password: client_secret,
      },
    };

    var data = { grant_type: 'client_credentials' };

    var auth_token = await axios.post(auth_api_URL, qs.stringify(data), headers);  

    var response = await axios.get(request_URL, { 
      headers: {'Authorization': `Bearer ${auth_token.data.access_token}` }
    });
    console.log(response.data);
  } */

  defineNextGoalAndPercentage = () => {
    let multiplier, percentage_calc, number_size = 0;    
    var goal = parseInt(this.state.views);    

    if(goal < 5 * 10**6){
      goal = 5 * 10**6;  
    }
    else if(goal < 10**7){
      goal = 10**7; 
    }
    else{
      while(parseInt(goal) > 0){
        number_size++;
        goal = goal / 10;
      }  
      multiplier = 10**(number_size - 1);
      goal = parseInt(this.state.views);
      goal = (Math.ceil(goal/multiplier)) * multiplier; 
    }      

    percentage_calc = (this.state.views * 100) / goal;

    this.setState({next_goal: goal});
    this.setState({percentage: percentage_calc});
    //Returns to the Parent te percentages so it can sort the array;
    this.props.onChange([this.state.id, percentage_calc]);
  }

  render(){
    return (
      <div>
       <Card style={{ width: '40rem', height: '10rem'}}>        
          <Card.Body>
          <Row>
            <Col md="3" id="img-col">
              <Card.Img src={this.state.thumb_src}  style={{ width: '10rem'}}/>
            </Col>
            <Col md="9">
              <Card.Title>
                <div className="card-title-div">{this.state.title}</div>
                <button onClick={() => navigator.clipboard.writeText(`https://youtu.be/${this.state.id}`)}>
                  <img alt="" src="./assets/link.png"></img>
                </button>
                <a href={`https://youtu.be/${this.state.id}`}>
                  <img alt="" src="./assets/youtube.png"></img>
                </a>
                </Card.Title>
              <Card.Text>Views: {new Intl.NumberFormat().format(this.state.views)}</Card.Text>
              <Card.Text>Próxima meta: {new Intl.NumberFormat().format(this.state.next_goal)} ({this.state.percentage.toFixed(2)}%)</Card.Text>
              <ProgressBar animated striped now={this.state.percentage.toFixed(2)} />
            </Col>
          </Row>          
          </Card.Body>
        </Card>
      </div>
    );  
  }
}

export default VideoCard;
