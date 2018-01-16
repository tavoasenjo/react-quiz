import React from 'react';
import PropTypes from 'prop-types';
import NiceButton from './NiceButton';

const Choices = ({ currentChoices, onSelectAnswer, allAnswers }) => {
	// console.log('these are the choices ', currentChoices);
	return (
		<div className="choices">
			{/*Loops through all the choices, and return NiceButton component*/}

			{currentChoices.map((currentChoice, i) => {
				return (
					<NiceButton
						allAnswers={allAnswers}
						key={i}
						currentChoice={currentChoice}
						index={i}
						onSelectAnswer={onSelectAnswer}
					/>
				);
			})}
		</div>
	);
};

Choices.propTypes = {
	currentChoices: PropTypes.array.isRequired,
	onSelectAnswer: PropTypes.func.isRequired,
	allAnswers: PropTypes.array.isRequired
};

export default Choices;
