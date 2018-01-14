import React from 'react';
import PropTypes from 'prop-types';

class NiceButton extends React.Component {
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
		const { currentChoice, index, onSelectAnswer } = this.props;
		return (
			<button
				ref={input => {
					this.button = input;
				}}
				className="btn btn-huge"
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
	onSelectAnswer: PropTypes.func.isRequired
};

export default NiceButton;
