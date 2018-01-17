import React from 'react';
import PropTypes from 'prop-types';

import Answers from './Answers';

const Results = ({
	allQuestions,
	allAnswers,
	loadNewQuestion,
	onLoadResults,
	correctAnswers,
	resultsLoaded,
	onRestart
}) => {
	// to count the number of correct answers
	let numberOfCorrect = 0;
	//if the correctAnswers exists (if we loaded all the answers), we will map all the questions and see if the correctAnswers[i] is equal to allAnswers[i]. If that's true, we want to increment the numberOfCorrect by one
	correctAnswers &&
		allQuestions.map((question, i) => {
			correctAnswers[i] === allAnswers[i] && numberOfCorrect++;
		});

	return (
		<div className={`results ${loadNewQuestion ? 'fade-out fade-out-active' : 'fade-out'}`}>
			<div className="loader">
				<div className="icon" />
			</div>
			<div className="results-overlay" />
			<h1>{`${resultsLoaded
				? `${numberOfCorrect} out of ${allQuestions.length} correct!`
				: 'Here are your answers:'}`}</h1>
			<div className="answers">
				{/*Create Answers component to map through and return all the answers*/}
				<Answers allAnswers={allAnswers} allQuestions={allQuestions} correctAnswers={correctAnswers} />
			</div>
			<div className="text-center">
				{//if the resultsLoaded is true we want to render 'Start Again' button if the resultsLoaded is false we will show submit button

				resultsLoaded
					? <button
							onClick={e => {
								onRestart();
								{
									/*this.props.onLoadResults()*/
								}
							}}
							className="btn btn-dark"
						>
							Start Again
						</button>
					: <button
							onClick={e => {
								onLoadResults();
								{
									/*this.props.onLoadResults()*/
								}
							}}
							className="btn btn-dark"
						>
							Submit
						</button>}
			</div>
		</div>
	);
};

Results.propTypes = {
	loadNewQuestion: PropTypes.bool.isRequired,
	allAnswers: PropTypes.array.isRequired,
	allQuestions: PropTypes.array.isRequired,
	onLoadResults: PropTypes.func.isRequired,
	correctAnswers: PropTypes.array,
	resultsLoaded: PropTypes.bool.isRequired,
	onRestart: PropTypes.func.isRequired
};

export default Results;
