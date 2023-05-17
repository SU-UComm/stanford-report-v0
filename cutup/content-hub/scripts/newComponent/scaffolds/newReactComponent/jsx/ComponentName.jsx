import React from 'react';
import PropTypes from 'prop-types';

const {NAME_camelcase} = ({text, image}) => {
    return (
        <div>
            <p>{text}</p>
            {image && <image src={image.imageVariations.original.url} alt="" />}
        </div>
    );
};

export default {NAME_camelcase};

{NAME_camelcase}.propTypes = {
    text: PropTypes.string,
    image: PropTypes.object,
};
