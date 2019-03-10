import React from 'react';
import './Home.css';
import Node from './NodeMethods';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('/api/entries', {accept:'application/json'})
    .then(res => res.json())
    .then(data=>{
      if (data.length) {
       this.setState({budget:data[0]});
      }
      else {
        this.setState({budget:Node.makeNew()});
      }
    })
    .catch(err => console.log('ERR:', err));
  }

  saveDB() {
    var url = 'api/entries';
    var options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify(this.state.budget)
    }
    if (!this.state.budget._id) {
      options.method = 'post';
    }
    else {
      url += '/' + this.state.budget._id;
    }
    fetch(url,options)
    .then(res=>res.json())
    .then(data=>this.setState({budget:data}));
  }

  sub(sub,classes='') {
    classes += 'sub';
    // var w = sub.spent/sub.limit;
    return (
      <div className={classes}>
        <div>{sub.name}</div>
        <div>{sub.spent + ' of ' + sub.limit}</div>
        <div className="sub">{}</div>
      </div>
    );
  }

  showState() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="Home">
        <button onClick={()=>this.showState()}>st</button>
        <button onClick={()=>this.saveDB()}>save</button>
        <button onClick={()=>this.createBudget()}>create new budget</button>
        <button onClick={()=>this.renameBudget()}>rename budget</button>
        <div className="list">{this.sub('total ')}</div>
      </div>
    );
  }
}

export default Home;

// var month = prompt('enter month');
// return fetch('/api/entries',{headers:{'Content-Type':'application/json'},method:'post',body: JSON.stringify({month})})

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

