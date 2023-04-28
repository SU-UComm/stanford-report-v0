import React from 'react';
import PropTypes from 'prop-types';

const SampleComponent = ({content}) => {
    const sampleOnClick = () => {
        alert('Clicked ...');
    };

    return (
        <div className="su-flex su-justify-center">
            <div className="su-px-30 su-py-10 su-max-w-500">
                <p className="currentDate">{new Date().toJSON().slice(0, 10).replace(/-/g, '/')}</p>
                <p>{content}</p>
            </div>
            <button
                onClick={() => {
                    sampleOnClick();
                }}
            >
                Click me
            </button>
        </div>
    );
};

export default SampleComponent;

SampleComponent.propTypes = {
    content: PropTypes.string,
};
