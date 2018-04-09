import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    headline: "",
    publishedDate: "",
    url: "",
    subject: "",
    startYear: "",
    endYear: "",
    note: ""
  };

  componentDidMount() {
    this.loadArticles();

  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, headline: "", publishedDate: "", url: "", note: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    console.log("Start the NYTimes query: " + this.state.subject)
    var authKey = "0b98e140867d4d3c9f8597f36a182f87";
    var query = this.state.subject
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
      authKey + "&q=" + query + "&start_date=" + this.state.startYear + "0101&end_date=" + this.state.endYear + "1231";

    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(results => {
        let articles = results.response.docs
        console.log(articles)
        articles.forEach((value, index) => {
          let data = {
            headline: value.headline.main,
            publishedDate: value.pub_date,
            url: value.web_url,
            _id: value._id,
            note: ""
          }
          console.log(data)
          API.saveArticle(data)
          return
        })
        
      })
      .then(() =>{
        this.loadArticles()
        return
      })
  };
  componentDidUpdate(){
    console.log(this.state.articles)
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Articles Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.subject}
                onChange={this.handleInputChange}
                name="subject"
                placeholder="subject to search (required)"
              />
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                name="startYear"
                placeholder="Start Year (required)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                name="endYear"
                placeholder="En Year (required"
              />
              <FormBtn
                disabled={!(this.state.subject && this.state.startYear && this.state.endYear)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Articles On My List</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.headline} written on {article.publishedDate}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;