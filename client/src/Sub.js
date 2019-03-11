import React from 'react';
import './Sub.css';

const Sub = (props) => {
	var info = '$'+props.node.spent+' of '+'$'+props.node.limit;
	return (
		<div className="sub">
			<div className="grid">
				<div>{props.node.name}</div><div>{info}</div><div className="graph"><span style={{width:props.node.spent/(props.node.limit||1),background:'green'}}></span><span></span></div>
			</div>
			<div>{Object.values(props.node.sub).map((s,i)=><Sub key={i} node={s} />)}</div>
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