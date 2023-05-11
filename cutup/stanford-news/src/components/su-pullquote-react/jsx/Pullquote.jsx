import React from 'react';
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
            <img
                src={image?.imageVariations?.original?.url}
                className="headshot"
                alt={attribution}
                decoding="async"
                srcSet="https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square-100x100.jpg 100w, https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square-555x555.jpg 555w, https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square-795x795.jpg 795w, https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square-960x960.jpg 960w, https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square.jpg 1343w, https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square-100x100@2x.jpg 200w, https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square-555x555@2x.jpg 1110w"
                sizes="(max-width: 100px) 100vw, 100px"
                loading="eager"
            />
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
