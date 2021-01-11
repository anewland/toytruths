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
    console.log('---- Round ' + params['round']);

    const api = 'https://admin.ithinkpixels.com/api/collections/get';
    const token = '148bed39568ed0436384f2e90bbe53';

    axios.get(api+'/toy_truths?token='+token+'&filter[episode]='+params['episode']+'&filter[round]='+params['round']).then(res => {
      console.dir(res);
      const epTruths = [];
      res.data.entries.forEach(element => {
        epTruths.push(element);
      });

      this.setState({
        truths: epTruths.sort(() => Math.random() - 0.5),
        rounds: Math.ceil(epTruths.length / 3),
        isLoaded: true
      })
    })
    .catch(err => console.log(err));
  }

  clicked(e) {
    e.target.classList.add('clicked');

    console.dir((Number(e.target.dataset.i) + 1) + ' | ' + e.target.dataset.a);

    if (e.target.classList.contains('False')) {
      console.dir(e.target.dataset.t);
    }

  }

  answer(e) {
    e.target.parentElement.classList.add('cont');
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

              <div className="col-12 buttons">
                <a href="/?episode=24&round=1">Round 1</a>
                <a href="/?episode=24&round=2">Round 2</a>
                <a href="/?episode=24&round=3">Round 3</a>
                <a href="/?episode=24&round=4">Round 4</a>
                <a href="/?episode=24&round=5">Round 5</a>
                {/* <a href="/?episode=23&round=6">Round 6</a> */}
              </div>
            </div>

            <div className="row">
              {truths.map((t, index) =>
                <div className="col-12 fact" key={ t._id }>
                  <div className={ t.status } onClick={ this.clicked } data-a={ t.status } data-i={ index } data-t={ t.truth }>
                    <p dangerouslySetInnerHTML={{ __html: t.fact }} />
                    <button className="answer" onClick={ this.answer }><span>A</span></button>
                  </div>
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