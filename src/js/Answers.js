import React from 'react';
import PropTypes from 'prop-types';

const Answers = ({ allAnswers, allQuestions }) => {
	// const { question } = allQuestions;
	return (
		<ol>
			{allQuestions.map((question, i) => {
				return (
					<li key={i}>
						{question.question} <br /> <strong>{allAnswers[i]}</strong>
					</li>
				);
			})}
		</ol>
	);
};

export default Answers;
