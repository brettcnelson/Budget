import React from 'react';
import './List.css';


class List extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      budgets:[]
    };
  }
	
  componentDidMount() {
  	this.fetchList();
	}

	fetchList() {
		fetch('/api/entries', {accept:'application/json'})
	  .then(res => res.json())
	  .then(budgets=>this.setState({budgets}))
	  .catch(err => console.log('ERR:', err));
	}

	deleteBudget(i) {
		fetch('/api/entries/'+this.state.budgets[i]._id,{headers:{'Content-Type':'application/json'},method:'delete'})
		.then(data=>{
			this.fetchList();
		});
	}

	render() {
		return (
			<ul className="list">
				{this.state.budgets.map((budget,i) => <div className="item" key={i}><li>{budget.budget.name}</li><button onClick={()=>this.deleteBudget(i)}>X</button></div>)}
			</ul>
		);
	}
}

export default List;
