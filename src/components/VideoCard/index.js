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
      id: props.title_id,
      title: "TWICE \"YES or YES\" M/V",
      views: "300058",
      next_goal: 0,
      percentage: 0,
      thumb_src: "https://i.ytimg.com/vi/mAKsZ26SabQ/sddefault.jpg"
    };   
  } 

  componentDidMount(){
    this.requestAPI();
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
    this.defineNextGoalAndPercentage();
  }  

  defineNextGoalAndPercentage(){
    let multiplier, percentage_calc, number_size = 0;    
    var goal = parseInt(this.state.views);    

    while(parseInt(goal) > 0){
      number_size++;
      goal = goal / 10;
    }

    multiplier = 10**(number_size - 1);
    goal = parseInt(this.state.views);
    goal = (Math.ceil(goal/multiplier)) * multiplier;    

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
            <Col md="8">
              <Card.Title>{this.state.title}</Card.Title>
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
