import React from 'react';
import PropTypes from 'prop-types';

const Answers = ({ allAnswers, allQuestions, correctAnswers }) => {
	return (
		<ol>
			{allQuestions.map((question, i) => {
				//check whether the answer is correct or not
				// in the isCorrect constant, check if the correctAnswers are loaded, if so then we want to get the correctAnswers[i] and compare it with the allAnswers[i]
				const isCorrect = correctAnswers && correctAnswers[i] === allAnswers[i];
				return (
					<li key={i} className={`${isCorrect ? 'text-success' : 'text-danger'}`}>
						{question.question} <br /> <strong>{allAnswers[i]}</strong>
						{/*place the correct answer*/}
						{correctAnswers &&
							!isCorrect &&
							<span className="correct-answer text-success">
								&nbsp;{correctAnswers[i]}
							</span>}
					</li>
				);
			})}
		</ol>
	);
};

Answers.propTypes = {
	correctAnswers: PropTypes.array,
	allAnswers: PropTypes.array.isRequired,
	allQuestions: PropTypes.array.isRequired
};

export default Answers;
