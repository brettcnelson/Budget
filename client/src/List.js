import React from 'react';

const List = () => {
	const nums = [1,2,3,4,5,6,7,8,9];
	return (
		<ul>
			{nums.map((num,i) => <li key={i}>{num}</li>)}
		</ul>
	)
}

export default List;
