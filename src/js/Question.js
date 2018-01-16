import React from 'react';
import PropTypes from 'prop-types';

import Choices from './Choices';

const Question = ({ currentQuestion, onSelectAnswer, loadNewQuestion, allAnswers }) => {
	const { question, choices } = currentQuestion;

	return (
		<div className={`question ${loadNewQuestion ? 'fade-out fade-out-active' : 'fade-out'}`}>
			<h1>
				{question}
			</h1>

			{/* Choices - start */}
			<Choices allAnswers={allAnswers} currentChoices={choices} onSelectAnswer={onSelectAnswer} />
			{/* Choices - end */}
		</div>
	);
};

Question.propTypes = {
	currentQuestion: PropTypes.object.isRequired,
	onSelectAnswer: PropTypes.func.isRequired,
	loadNewQuestion: PropTypes.bool.isRequired,
	allAnswers: PropTypes.array.isRequired
};

export default Question;
