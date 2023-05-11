import React from 'react';
import Image from './Image.jsx';
import PropTypes from 'prop-types';

const Pullquote = ({quote, attribution, alignment, image, description}) => {
    let alignmentClass;
    switch (alignment) {
        case 'left':
            alignmentClass = 'pull-left pull-left-narrow';
            break;
        case 'center':
            alignmentClass = 'align-center inset-width center-block';
            break;
        case 'right':
            alignmentClass = 'pull-right pull-right-narrow';
            break;
        default:
            alignmentClass = 'pull-right pull-right-narrow';
    }

    return (
        <div className={`pullquote ${alignmentClass}`}>
            {image && <Image image={image} alt={attribution} />}
            <blockquote>
                <p>“{quote}”</p>
                <p className="quote-attrib">—{attribution}</p>
                <p className="quote-attrib supplemental">{description}</p>
            </blockquote>
        </div>
    );
};

export default Pullquote;

Pullquote.propTypes = {
    quote: PropTypes.string,
    attribution: PropTypes.string,
    alignment: PropTypes.string,
    image: PropTypes.object,
    description: PropTypes.string,
};
