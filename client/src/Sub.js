import React from 'react';
import './Sub.css';
import Trans from './Trans';

const Sub = (props) => {
	var totals = props.node.totals();
	var info = '$'+totals.spent+' of '+'$'+totals.limit;
	var styles = {background:'rgb(87, 237, 49)',width:''+(totals.spent*100)/totals.limit+'%'};
	if (totals.spent/totals.limit>1) {
		styles.background = 'red';
		styles.width = '100%';
	}


	function addCat(name) {
		props.node.addCat(prompt('enter name'),Number(prompt('enter limit'))||0,Number(prompt('enter amount spent'))||0);
		props.stateChange();
	}

	function deleteCat(i) {
		props.node.deleteCat(i);
		props.stateChange();
	}

	function addTrans() {
		props.node.addTrans(Number(prompt('enter amount'))||0);
		props.stateChange();
	}

	function changeLimit() {
		props.node.changeLimit(Number(prompt('enter new limit'))||0);
		props.stateChange();
	}

  function deleteTrans(i) {  	
  	props.node.deleteTrans(i);
  	props.stateChange();
  }

	return (
		<div className="sub">
			<div className="grid">
				<div>{props.node.name}</div><div>{'$'+(totals.limit-totals.spent)+' left'}</div><div className="graph"><div className="bar" style={styles}><div className="info">{info}</div></div></div>
			</div>
			<div>
				<Trans trans={props.node.trans} deleteTrans={deleteTrans} />
				<button onClick={addTrans}>add transaction</button>
				<button onClick={addCat}>add sub-category</button>
				<button onClick={changeLimit}>change limit</button>
				<button onClick={()=>deleteCat(props.index)}>delete category</button>
			</div>
			<div>{props.node.sub.map((s,i)=><Sub index={i} key={i} node={s} stateChange={props.stateChange} />)}</div>
		</div>
	);
}

export default Sub;

// sub(node,i) {
//     // console.log(node)
//     return (
//       <div className="sub" key={i}>
//         <div>{node.name}</div>
//         <div>{node.spent + ' of ' + node.limit}</div>
//         <div className="sub">{Object.values(node.sub).map((n,i)=>this.sub(n,i))}</div>
//       </div>
//     );
// }