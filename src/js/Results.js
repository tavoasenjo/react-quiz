import React from 'react';
import PropTypes from 'prop-types';

import Answers from './Answers';

const Results = ({ allQuestions, allAnswers, loadNewQuestion, onLoadResults, correctAnswers }) => {
	return (
		<div className={`results ${loadNewQuestion ? 'fade-out fade-out-active' : 'fade-out'}`}>
			<div className="loader">
				<div className="icon" />
			</div>
			<div className="results-overlay" />
			<h1>Here are your answers:</h1>
			<div className="answers">
				{/*Create Answers component to map through and return all the answers*/}
				<Answers allAnswers={allAnswers} allQuestions={allQuestions} correctAnswers={correctAnswers} />
			</div>
			<div className="text-center">
				<button
					onClick={e => {
						onLoadResults();
						{
							/*this.props.onLoadResults()*/
						}
					}}
					className="btn btn-dark"
				>
					Submit
				</button>
			</div>
		</div>
	);
};

Results.propTypes = {
	loadNewQuestion: PropTypes.bool.isRequired,
	allAnswers: PropTypes.array.isRequired,
	allQuestions: PropTypes.array.isRequired,
	onLoadResults: PropTypes.func.isRequired,
	correctAnswers: PropTypes.array
};

export default Results;
