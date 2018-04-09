import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { TextArea, FormBtn } from "../../components/Form";


class Detail extends Component {
  state = {
    article: [],
    headline: "",
    publishedDate: "",
    url: "",
    note: ""
    
  };
  // Add code to get the article with an _id equal to the id in the route param
  // e.g. http://localhost:3000/books/:id
  // The article id for this route can be accessed using this.props.match.params.id
  componentDidMount() {
    this.loadArticle();
  }

  loadArticle = () => {
    API.getArticle(this.props.match.params.id)
      .then(res =>
        this.setState({ article: res.data, headline: "", note: "", url: "" })
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleNoteSubmit = () => {
    let data = {
      headline: this.state.article.headline,
      publishedDate: this.state.article.publishedDate,
      url: this.state.article.url,
      _id: this.state.article._id,
      note: this.state.note
    };
    API.updateArticle(data._id, data);
    console.log(data)
    this.loadArticle();
    return
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.article.headline} 
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>URL</h1>
              <a href={this.state.article.url}>
              <p>{this.state.article.url}</p>
              </a>
              
              { this.state.article.note ? (
                
                <p>Current Note: {this.state.article.note}</p>
                
              ) : (
                <p>No Notes Currently</p>
              )}
              <h2>Type Note Here</h2>
              <TextArea
              value={this.state.note}
              onChange={this.handleInputChange}
              name="note"
              placeholder="Type a note here"
              >
              </TextArea>
              <FormBtn
              onClick={this.handleNoteSubmit}
              >
                Submit Note
              </FormBtn>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Articles</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;