import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

export class Page extends Component {
  state = {
    podcasts: [],
    isLoaded: false,
  }

  componentDidMount() {

    var search = window.location.search.substring(1);
    JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });

    console.log(search);

    const api = 'https://admin.ithinkpixels.com/api/collections/get';
    const token = '148bed39568ed0436384f2e90bbe53';

    axios.get(api+'/toy_truths?token='+token).then(res => {
      console.dir(res);

      this.setState({
        isLoaded: true
      })
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <section className="content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>TOY TRUTHS</h2>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Page;