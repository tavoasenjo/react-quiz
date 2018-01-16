import React from 'react';
import PropTypes from 'prop-types';

class NiceButton extends React.Component {
	// es6 method GETTER
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
	get selected() {
		//first distructure the props we will use
		const { allAnswers, currentChoice } = this.props;
		//if allAnswers includes currentChoice, it will return true
		return allAnswers.includes(currentChoice);
		//then go to the className to write the conditional
	}

	getLetter = index => {
		const letters = ['A', 'B', 'C'];
		return letters[index];
	};

	//in order to make delay and animate the button when the user click it, we will create a function to handle it.
	handleClick = e => {
		const { currentChoice, onSelectAnswer } = this.props;

		//add the highlight class first and the go to next question
		//so we need to target the button and give it a ref

		this.button.classList.add('is-selected', 'is-highlighted');

		setTimeout(e => {
			onSelectAnswer(currentChoice);
		}, 500);

		// remove classes for next question choices
		setTimeout(e => {
			this.button.classList.remove('is-selected', 'is-highlighted');
		}, 500);
	};

	render() {
		const { currentChoice, index, onSelectAnswer, allAnswers } = this.props;
		return (
			<button
				ref={input => {
					this.button = input;
				}}
				// here we will write the conditional of the getter: this.selected
				className={`btn btn-huge ${this.selected ? 'is-selected' : ''}`}
				onClick={e => {
					this.handleClick(e);
				}}
			>
				<span className="letter">{this.getLetter(index)}</span> {currentChoice}
			</button>
		);
	}
}

NiceButton.propTypes = {
	currentChoice: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	onSelectAnswer: PropTypes.func.isRequired,
	allAnswers: PropTypes.array.isRequired
};

export default NiceButton;
