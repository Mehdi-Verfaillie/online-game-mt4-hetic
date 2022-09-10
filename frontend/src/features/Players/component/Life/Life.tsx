/* eslint-disable prettier/prettier */
import React from 'react';

import LifeLogo from '../../../../style/images/life.svg';

type Props = {
	life?: number;
};

function Life(props: Props) {
	return (
		<div>
			{[...Array(props.life)].map((e, i) => (
				<span key={i} style={{ marginRight: '2px', marginLeft: '2px' }}>
					<img src={LifeLogo} alt="logo" />
				</span>
			))}
		</div>
	);
}

export default Life;
