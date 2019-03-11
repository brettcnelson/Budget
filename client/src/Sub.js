import React from 'react';
import './Sub.css';
import Trans from './Trans';

const Sub = (props) => {
	var spent = props.node.spent + props.node.sub.reduce((a,b)=>a+b.spent,0);
	var limit = props.node.limit + props.node.sub.reduce((a,b)=>a+b.limit,0);
	var info = '$'+spent+' of '+'$'+limit;

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
		props.node.addTrans(Number(prompt('enter new limit'))||0);
		props.stateChange();

	}

	return (
		<div className="sub">
			<div className="grid">
				<div>{props.node.name}</div><div>{info}</div><div className="graph"><span style={{width:spent/(limit||1),background:'green'}}></span><span></span></div>
			</div>
			<div>
				<Trans trans={props.node.trans} />
				<button onClick={addTrans}>add transaction</button>
				<button onClick={addCat}>add sub-category</button>
				<button onClick={changeLimit}>change limit</button>
				<button onClick={()=>deleteCat(props.index)}>delete category</button>
			</div>
			<div>{props.node.sub.map((s,i)=><Sub index={i} key={i} node={s} stateChange={props.stateChange}/>)}</div>
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