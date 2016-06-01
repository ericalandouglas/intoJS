
import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/searchBar.js';
import VideoList from './components/videoList.js';
import VideoDetail from './components/videoDetail.js';
const API_KEY = 'AIzaSyAEsM4Wds-gZZ-MpON96uyI2iASEK1ZyYI';


// Create a new component, this component should produce some HTML
class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch (term) {
    YTSearch({ key: API_KEY, term: term }, (videos) => {
      this.setState({ videos }); // ES6 syntactic sugar for when key and property are same var name
      this.setState({
        selectedVideo: videos[0]
      });
    });
  }

  render () {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300); // limits the call of this function to once every 300 ms

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) } // VideoList can now access this function on props
          videos={this.state.videos}
        />
      </div>
    );
  }

};

// Take this component's generated HTML and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));

