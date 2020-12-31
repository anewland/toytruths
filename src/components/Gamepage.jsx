import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';

let getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};

export class Page extends Component {
  state = {
    truths: [],
    rounds: 0,
    isLoaded: false,
  }

  componentDidMount() {
    let params = getParams(window.location.href);

    const api = 'https://admin.ithinkpixels.com/api/collections/get';
    const token = '148bed39568ed0436384f2e90bbe53';

    axios.get(api+'/toy_truths?token='+token+'&filter[episode]='+params['episode']+'&filter[round]='+params['round']).then(res => {
      // console.dir(res);
      const epTruths = [];
      res.data.entries.forEach(element => {
        epTruths.push(element);
      });

      this.setState({
        truths: epTruths,
        rounds: Math.ceil(epTruths.length / 3),
        isLoaded: true
      })
    })
    .catch(err => console.log(err));
  }

  render() {
    let { truths } = this.state;
    let params = getParams(window.location.href);

    return (
      <>
        <section className="content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>TOY TRUTHS</h2>
                <h3>EPISODE { params['episode'] } | ROUND { params['round'] }</h3>
              </div>

              <div className="col-12">
                <button>Round 1</button>
                <button>Round 2</button>
              </div>
            </div>

            <div className="row">
              {truths.map(t =>
                <div className="col-4">
                  <p key={ t._id } dangerouslySetInnerHTML={{ __html: t.fact }} />
                </div>
              )}
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Page;