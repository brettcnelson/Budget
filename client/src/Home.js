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
    .then(data=> this.setState({budget:data[0]}))
    .catch(err => console.log('ERR:', err));
  }

  makeNew(name) {
    var root = new Node({name});
    root.addCat('mandatory');
    root.addCat('optional');
    return root;
  }

  saveDB(name) {
    var budget = this.state.budget.budget;
    if (name) {
      budget.name = name;
    }
    (function deleteParent(node) {
      delete node.parent;
      for (var key in node.sub) {
        deleteParent(node.sub[key]);
      }
    }(budget));
    var url = 'api/entries';
    var options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify({budget})
    }
    if (!this.state.budget._id) {
      options.method = 'post';
    }
    else {
      url += '/' + this.state.budget._id;
    }
    fetch(url,options)
    .then(res=>res.json())
    .then(data=>this.setState({budget:data}))
    .catch(err => console.log('ERR:', err));
  }

  renameBudget() {
    this.saveDB(prompt('change name'));
  }

  sub(node,classes='') {
    classes += 'sub';
    // var w = sub.spent/sub.limit;
    return (
      <div className={classes}>
        <div>{node.name}</div>
        <div>{node.spent + ' of ' + node.limit}</div>
        <div className="sub">{Object.values(node.sub||{}).map((n)=>this.sub(n))}</div>
      </div>
    );
  }

  createBudget() {
    this.setState({budget:{budget:this.makeNew(prompt('enter a name'))}},()=>this.saveDB());
  }

  showState() {
    console.log(this.state);
  }

  render() {
    return !this.state.budget ? <div onClick={()=>this.createBudget()}>add a budget</div> : (
      <div className="Home">
        <button onClick={()=>this.createBudget()}>create new budget</button>
        <button onClick={()=>this.renameBudget()}>rename budget</button>
        <div className="list">{this.sub(this.state.budget.budget)}</div>
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

