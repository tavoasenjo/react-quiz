import React from 'react';
import PropTypes from 'prop-types';
import NiceButton from './NiceButton';

const Choices = ({ currentChoices, onSelectAnswer }) => {
	// console.log('these are the choices ', currentChoices);
	return (
		<div className="choices">
			{/*Loops through all the choices, and return NiceButton component*/}

			{currentChoices.map((currentChoice, i) => {
				return <NiceButton key={i} currentChoice={currentChoice} index={i} onSelectAnswer={onSelectAnswer} />;
			})}
		</div>
	);
};

Choices.propTypes = {
	currentChoices: PropTypes.array.isRequired,
	onSelectAnswer: PropTypes.func.isRequired
};

export default Choices;
