import React from 'react';

class List extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      months:[]
    };
  }
	
  componentDidMount() {
		fetch('/api/entries', {accept:'application/json'})
		  .then(res => res.json())
		  .then(months=>this.setState({months}))
		  .catch(err => console.log('ERR:', err));
	}

	render() {
		return (
			<ul>
				{this.state.months.map((month,i) => <li key={i}>{month.month}</li>)}
			</ul>
		);
	}
}

export default List;
