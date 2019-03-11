import React from 'react';
import './Trans.css';

class Trans extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      show:false
    };
  }

  showHide() {
  	var show = this.state.show;
  	this.setState({show:!show});
  }

	render() {
		return this.props.trans.length ?
			(<div className="trans" onClick={()=>this.showHide()}>
					<div>{this.state.show?'^':'<>'} transactions</div>
					{this.state.show && this.props.trans.map((t,i)=><div key={i}>{t}</div>)}
				</div>
			) :
			null;
	}
}

export default Trans;
