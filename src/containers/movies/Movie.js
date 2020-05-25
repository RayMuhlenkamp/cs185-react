import React, { Component } from 'react';
import { moviesKEY } from '../../config'

const axios = require("axios").default;

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.componentWillMount = this.componentWillMount.bind(this)
        this.setModal = this.setModal.bind(this)
    }


    setModal() {
        if (this.state.data) {
            this.props.onClick(this.state.data);
        }
    }

    componentWillMount() {
        axios.get("https://www.omdbapi.com/" , {
            params: {
                apikey: moviesKEY,
                i: this.props.id
            }
        })
        .then ( (response) => {
            this.setState({data: response.data})
        })
        .catch ( (error) => {
            this.state.data = {}
            console.log(error);
        })
    }

    render() {
        if (!this.state.data) {
            return(
                <div>
                </div>
            )
        }

        const title = "Title: " + this.state.data.Title + "\n";
        const director = "Director: " + this.state.data.Director + "\n";
        const rating = "Rating: " + this.state.data.imdbRating;
        const alt = title+director+rating;
        return(
            <div className="content_holder" onClick={this.setModal}>
                <img className="img" src={this.state.data.Poster} alt={alt} />
            </div>
        );
  }
}

export default Movie;