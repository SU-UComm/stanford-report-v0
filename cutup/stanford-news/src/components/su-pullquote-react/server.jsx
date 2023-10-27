import React from 'react';
import {renderToString} from 'react-dom/server';

import Pullquote from './jsx/Pullquote.jsx';

export default async (args) => {
    const htmlMarkup = renderToString(
        <div data-hydration-component="su-pullquote-react">
            <Pullquote {...args} />
        </div>,
    );

    return htmlMarkup;
};
