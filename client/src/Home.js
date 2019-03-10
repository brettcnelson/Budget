import React from 'react';
import './Home.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
    fetch('/api/entries', {accept:'application/json'})
    .then(res => res.json())
    .then(data=>{
      if (!data.length) {
        var month = prompt('enter month');
        return fetch('/api/entries',{headers:{'Content-Type':'application/json'},method:'post',body: JSON.stringify({month})})
      }
     return data;
    })
    .then(data=> {
      console.log(data);
      this.setState({budget:data});
      console.log(this.state);
    })
    .catch(err => console.log('ERR:', err));
  }

  dropDB() {
    
  }

  render() {
    return (
      <div className="Home">
        <button onClick={this.dropDB}>start over</button>
        <div>{this.state.budet}</div>
        <div></div>
        <div></div>
      </div>
    );
  }
}

export default Home;

  // api(url,options,stateKey) {
  //   fetch(url, options)
  //   .then(res => res.json())
  //   .then(data => {
  //     var newState = {};
  //     newState[stateKey] = data;
  //     setTimeout(() => this.setState(newState), this.state.delay)
  //   })
  //   .catch(err => console.log('ERR:', err));
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   var options;
  //   if (prevState.api !== this.state.api) {
  //     // check api POST
  //     options = {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       method: 'post',
  //       body: JSON.stringify({"database":"default","dbCollection":"entries"})
  //     };
  //     this.api('/api/entries', options, 'post');
  //   }
  //   else if (prevState.post !== this.state.post) {
  //     // check api GET
  //     options = {accept: 'application/json'};
  //     this.api('/api/entries', options, 'get');
  //   }
  //   else if (prevState.get !== this.state.get) {
  //     // check api PUT
  //     options = {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       method: 'put',
  //       body: JSON.stringify({"database":"UPDATED","dbCollection":"UPDATED"})
  //     };
  //     this.api('/api/entries/' + this.state.get[this.state.get.length-1]._id, options, 'put');
  //   }
  //   else if (prevState.put !== this.state.put) {
  //     // check api DELETE
  //     options = {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       method: 'delete'
  //     };
  //     this.api('/api/entries/' + this.state.get[this.state.get.length-1]._id, options, 'delete');
  //   }
  // }

