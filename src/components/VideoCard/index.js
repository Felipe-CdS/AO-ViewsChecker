import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import './styles.css';

class VideoCard extends React.Component {   

  constructor(props){
    super(props);

    this.state = {
      id: props.title_id,
      title: "",
      views: "",
      next_goal: 0,
      thumb_src: ""
    };   
  }  

  async requestAPI(){
    var apiString = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics";
    var params = {
      key: process.env.REACT_APP_API_KEY,
      id: this.state.id
    };
    var response = await axios.get(apiString, {params}).then((resp) => resp.data);
    this.setState({title: response.items[0].snippet.title});
    this.setState({views: response.items[0].statistics.viewCount});
    this.setState({thumb_src: response.items[0].snippet.thumbnails.standard.url});
    this.defineNextGoal();
  }

  componentDidMount(){
    this.requestAPI();
  }

  defineNextGoal(){
    var goal_holder = parseInt(this.state.views);

    if(goal_holder <= 10**7){
      goal_holder = (Math.ceil(goal_holder/10**6)) * 10**6;
    }
    else if(goal_holder <= 10**8){
      goal_holder = (Math.ceil(goal_holder/10**7)) * 10**7;
    }
    else if(goal_holder <= 10**9){
      goal_holder = (Math.ceil(goal_holder/10**8)) * 10**8;
    }
    else if(goal_holder <= 10**10){
      goal_holder = (Math.ceil(goal_holder/10**9)) * 10**9;
    }
    this.setState({next_goal: goal_holder});
  }

  render(){
    return (
      <div>
       <Card style={{ width: '40rem', height: '10rem', border: '3px solid #F45990'}}>        
          <Card.Body>
          <Row>
            <Col md="3" id="img-col">
              <Card.Img src={this.state.thumb_src}  style={{ width: '10rem'}}/>
            </Col>
            <Col md="8">
              <Card.Title>{this.state.title}</Card.Title>
              <Card.Text>Views: {new Intl.NumberFormat().format(this.state.views)}</Card.Text>
              <Card.Text>Próxima meta: {new Intl.NumberFormat().format(this.state.next_goal)}</Card.Text>
            </Col>
          </Row>          
          </Card.Body>
        </Card>
      </div>
    );  
  }
}

export default VideoCard;
