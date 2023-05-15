import React from 'react';
import PropTypes from 'prop-types';

const Image = ({image, attribution}) => {
    let srcset = [];
    image.imageVariations.aspectRatios.forEach((img) => {
        if (img.width === 100 && img.height === 100) {
            srcset.push(`${img.url} 100w`);
        } else if (img.width === 200 && img.height === 200) {
            srcset.push(`${img.url} 200w`);
        } else if (img.width === 555 && img.height === 555) {
            srcset.push(`${img.url} 555w`);
        } else if (img.width === 795 && img.height === 795) {
            srcset.push(`${img.url} 795w`);
        } else if (img.width === 960 && img.height === 960) {
            srcset.push(`${img.url} 960w`);
        } else if (img.width === 1110 && img.height === 1110) {
            srcset.push(`${img.url} 1110w`);
        } else if (img.width === 1343 && img.height === 1343) {
            srcset.push(`${img.url} 1343w`);
        }
    });

    return (
        <img
            src={image?.imageVariations?.original?.url}
            className="headshot"
            alt={attribution}
            decoding="async"
            srcSet={srcset.join(', ')}
            sizes="(max-width: 100px) 100vw, 100px"
            loading="eager"
        />
    );
};

export default Image;

Image.propTypes = {
    image: PropTypes.object,
    attribution: PropTypes.string,
};
