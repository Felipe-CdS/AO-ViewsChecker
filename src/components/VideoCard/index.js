import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';

import './styles.css';
import './mobile_styles.css';

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
       <Card>

          <Card.Body className="default-size-card">
          <Row>
            <Col xs="3" id="img-col">
              <Card.Img src={this.state.thumb_src}/>
            </Col>
            <Col xs="9">
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

          <Card.Body className="mobile-size-card">
          <Row>
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
          </Row>
          <Row>
            <Col xs="5" id="img-col">
              <Card.Img src={this.state.thumb_src}/>
            </Col>
            <Col xs="7">              
              <Card.Text>Views: {new Intl.NumberFormat().format(this.state.views)}</Card.Text>
              <Card.Text>Próxima meta: {new Intl.NumberFormat().format(this.state.next_goal)}</Card.Text>
              <Card.Text>({this.state.percentage.toFixed(2)}%)</Card.Text>              
            </Col>
          </Row>         
          <Row>
            <ProgressBar animated striped now={this.state.percentage.toFixed(2)}/>
          </Row> 
          </Card.Body>
        </Card>
    );  
  }
}

export default VideoCard;
