import React from 'react';
import PropTypes from 'prop-types';

const Choices = () => {
	return(
		<div className="choices">
            
            {/* Buttons - start */}
            <button className="btn btn-huge is-selected"><span className="letter">A</span> Melbourne</button>
            <button className="btn btn-huge"><span className="letter">B</span> New York</button>
            <button className="btn btn-huge"><span className="letter">C</span> London</button>
            {/* Buttons - end */}

        </div>
	)
}


export default Choices;