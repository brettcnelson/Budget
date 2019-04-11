import React from 'react';
import './Home.css';
import Node from './NodeMethods';
import Sub from './Sub';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    fetch('/api/entries', {accept:'application/json'})
    .then(res => res.json())
    .then(data=> {
      if (data.length) {
        this.setState({_id:data[0]._id,budget:new Node(data[0].budget)});
      }
    })
    .catch(err => console.log('ERR:', err));
  }

  saveDB(name,post,budget=this.state.budget) {
    if (name) {
      budget.name = name;
    }
    (function deleteParent(node) {
      delete node.parent;
      node.sub.forEach(deleteParent);
    }(budget));
    var url = 'api/entries';
    var options = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify({budget})
    }
    if (post) {
      options.method = 'post';
    }
    else {
      url += '/' + this.state._id;
    }
    fetch(url,options)
    .then(res=>res.json())
    .then(data=>this.setState({_id:data._id,budget:new Node(data.budget)}))
    .catch(err => console.log('ERR:', err));
  }

  renameBudget() {
    this.saveDB(prompt('change name'));
  }

  createBudget() {
    var name = prompt('enter a name');
    if (name) {
      this.saveDB(null,true,new Node({name}));
    }
  }

  deleteBudget() {
    fetch('/api/entries/'+this.state._id,{headers:{'Content-Type':'application/json'},method:'delete'})
    .then(data=>this.setState({budget:null}))
    .catch(err=>console.log(err));
  }

  render() {
    return (
      <div className="Home">
        <button onClick={()=>this.createBudget()}>+</button>
        <button onClick={()=>this.renameBudget()}>rename budget</button>
        <button onClick={()=>this.deleteBudget()}>delete budget</button>
        {this.state.budget ? <Sub node={this.state.budget} stateChange={()=>this.saveDB()} /> : null}
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

