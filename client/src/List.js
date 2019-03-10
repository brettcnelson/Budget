import React from 'react';

class List extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      budgets:[]
    };
  }
	
  componentDidMount() {
		fetch('/api/entries', {accept:'application/json'})
		  .then(res => res.json())
		  .then(budgets=>this.setState({budgets}))
		  .catch(err => console.log('ERR:', err));
	}

	render() {
		return (
			<ul>
				{this.state.budgets.map((budget,i) => <li key={i}>{budget.budget.name}</li>)}
			</ul>
		);
	}
}

export default List;
