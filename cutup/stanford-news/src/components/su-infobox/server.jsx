import React from 'react';
import {renderToString} from 'react-dom/server';

import Infobox from './jsx/Infobox.jsx';

export default async (args) => {
    const htmlMarkup = renderToString(
        <div data-hydration-component="su-infobox">
            <Infobox {...args} />
        </div>,
    );

    return htmlMarkup;
};
