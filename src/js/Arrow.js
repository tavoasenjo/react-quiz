import React from 'react';
import PropTypes from 'prop-types';
// importing images for the arrows
import arrowLeftImg from '../images/navigation-left-arrow.svg';
import arrowRightImg from '../images/navigation-right-arrow.svg';

const Arrow = ({ direction, progress, allAnswers, goToPreviousQuestion, goToNextQuestion }) => {
	// Constant to determine which of the arrows we will render. We will check for the direction, and if the direction is left, we will render the left arrow. Same if the direction is the right, we will render the right arrow.
	const image = direction === 'left' ? arrowLeftImg : arrowRightImg;

	// We need to define when the button should be disabled
	//two conditionals: 1- we are at the first question. 2- the question hasn't been answered yet
	const isDisabled = (direction === 'left' && progress === 0) || (direction === 'right' && !allAnswers[progress]);
	return (
		<button
			disabled={isDisabled}
			className={`arrow ${isDisabled ? 'is-disabled' : ''}`}
			onClick={e => {
				direction === 'left' ? goToPreviousQuestion() : goToNextQuestion();
			}}
		>
			<img src={image} />
			{direction}
		</button>
	);
};

Arrow.propTypes = {
	direction: PropTypes.string.isRequired,
	progress: PropTypes.number.isRequired,
	allAnswers: PropTypes.array.isRequired,
	goToPreviousQuestion: PropTypes.func,
	goToNextQuestion: PropTypes.func
};

export default Arrow;
