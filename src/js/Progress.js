import React from 'react';
import PropTypes from 'prop-types';

const Progress = ({ total, progress }) => {
	const totalPercentage = progress > 0 ? 100 / (total / progress) : 0;
	return (
		<div className="progress-container">
			<div className="progress-label">
				{`${progress} of ${total} answered`}
			</div>
			<div className="progress">
				{/*Note that the animation of the progress bar is product of the bootstrap style when we change the width percentage*/}
				<div className="progress-bar" style={{ width: `${totalPercentage}%` }}>
					<span className="sr-only">{`${totalPercentage}% Complete`}</span>
				</div>
			</div>
		</div>
	);
};

Progress.propTypes = {
	total: PropTypes.number.isRequired,
	progress: PropTypes.number.isRequired
};

export default Progress;
