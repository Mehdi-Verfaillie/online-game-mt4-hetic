import React from 'react';

import LifeLogo from './life.svg';

type Props = {
	life?: number;
};

function Life(props: Props) {
	return (
		<div>
			{[...Array(props.life)].map((e, index) => (
				<span style={{ marginRight: '2px', marginLeft: '2px' }}>
					<img src={LifeLogo} alt="logo" />
				</span>
			))}
		</div>
	);
}

export default Life;
