import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';

import './styles.css';

class VideoCard extends React.Component {   

  constructor(props){
    super(props);

    this.state = {
      id: props.id,
      title: props.title,
      views: props.views || 0,
      next_goal: props.next_goal || 0,
      percentage: props.percentage || 0,
      thumb_src: `https://i.ytimg.com/vi/${props.id}/sddefault.jpg`
    };   
  }

  linkButtonClickEvent = () =>{
    navigator.clipboard.writeText(`https://youtu.be/${this.state.id}`);
    document.getElementById(`link-button-tooltip-${this.state.id}`).classList.toggle("clicked");
    setTimeout(() => {
      document.getElementById(`link-button-tooltip-${this.state.id}`).classList.toggle("clicked");
    }, 1000);
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
                <button onClick={this.linkButtonClickEvent}>
                    <img alt="" src="./assets/link.png"></img>
                    <span className="link-button-tooltip" id={`link-button-tooltip-${this.state.id}`}>Copied!</span>
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
