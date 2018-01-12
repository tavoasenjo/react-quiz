import React from 'react';
import PropTypes from 'prop-types';

import Choices from './Choices';

const Question = (props) => {
	return(
		<div className={`question`}>

          <h1>{props.currentQuestion.question}</h1>

          {/* Choices - start */}
          <Choices />
          {/* Choices - end */}

        </div>
	)

}

Question.propTypes = {
	currentQuestion: PropTypes.object.isRequired
}


export default Question;



