import React, { Component } from 'react';
import '../css/Posts.css'

const request = require('request');
const urlencode = require('urlencode');
const markdown = require('markdown-it')({html:true, xhtmlOut:true});

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

class App extends Component {
    state = {
        inside : '',
        loading : (<div className="loading">Loading&#8230;</div>)
    }

    constructor(props) {
        super(props);

        this.getPostMD(this, 'about')
    }

    getPostMD(_this, file) {
        request.get({uri:`http://localhost:4000/post/getPage/${urlencode(file)}`}, (err, res, body) => {
            _this.setState({inside : body, loading : null})
        });
    }

    render() {
        const { inside, loading } = this.state;
        return (
            <div>
                {loading}

                <div className="hero-image2">
                    <div className="hero-text">
                        <h1>About</h1>
                        <p>Who am I?</p>
                    </div>
                </div>

                {/* MD -> HTML rendering */}
                <article className = "markdown-body">
                <div dangerouslySetInnerHTML = {{__html: replaceAll(markdown.render(inside), 'img src="..', 'img src="http://localhost:4000')}}/>
                </article>
            </div>
        );
    }
}

export default App;