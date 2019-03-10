import React from 'react';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      api: undefined,
      post: undefined,
      get: undefined,
      put: undefined,
      delete: undefined,
      delay:750
    };
  }

  componentDidMount() {
    // check express api proxy feed
    var options = {accept:'application/json'};
    this.api('/api', options, 'api');
  }

  componentDidUpdate(prevProps, prevState) {
    var options;
    if (prevState.api !== this.state.api) {
      // check api POST
      options = {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({"database":"default","dbCollection":"entries"})
      };
      this.api('/api/entries', options, 'post');
    }
    else if (prevState.post !== this.state.post) {
      // check api GET
      options = {accept: 'application/json'};
      this.api('/api/entries', options, 'get');
    }
    else if (prevState.get !== this.state.get) {
      // check api PUT
      options = {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify({"database":"UPDATED","dbCollection":"UPDATED"})
      };
      this.api('/api/entries/' + this.state.get[this.state.get.length-1]._id, options, 'put');
    }
    else if (prevState.put !== this.state.put) {
      // check api DELETE
      options = {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'delete'
      };
      this.api('/api/entries/' + this.state.get[this.state.get.length-1]._id, options, 'delete');
    }
  }

  api(url,options,stateKey) {
    fetch(url, options)
    .then(res => res.json())
    .then(data => {
      var newState = {};
      newState[stateKey] = data;
      setTimeout(() => this.setState(newState), this.state.delay)
    })
    .catch(err => console.log('ERR:', err));
  }

  JSON(stateKey) {
    return (<pre><code>{JSON.stringify(this.state[stateKey], null, '\t')}</code></pre>);
  }

  passFail(stateKey) {
    return 'crud ' + (this.state[stateKey] ? 'passing' : 'failing');
  }

  render() {
    return (
      <div className="Home">
        <div className="justify"><code className={this.passFail('api')}>/api</code></div>
        <div className="justify"><div>PROXY</div></div>
        <div className="left">{this.JSON('api')}</div>
        <div className="justify"><div className={this.passFail('post')}>C</div></div>
        <div className="justify"><div>POST</div></div>
        <div className="left">{this.JSON('post')}</div>
        <div className="justify"><div className={this.passFail('get')}>R</div></div>
        <div className="justify"><div>GET</div></div>
        <div className="left">{this.JSON('get')}</div>
        <div className="justify"><div className={this.passFail('put')}>U</div></div>
        <div className="justify"><div>PUT</div></div>
        <div className="left">{this.JSON('put')}</div>
        <div className="justify"><div className={this.passFail('delete')}>D</div></div>
        <div className="justify"><div>DELETE</div></div>
        <div className="left">{this.JSON('delete')}</div>
      </div>
    );
  }
}

export default Home;
