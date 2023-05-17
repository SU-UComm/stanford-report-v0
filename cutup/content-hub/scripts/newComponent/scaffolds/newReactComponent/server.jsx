import React from 'react';
import {renderToString} from 'react-dom/server';

import {NAME_camelcase} from './jsx/{NAME_camelcase}.jsx';

export default async (args) => {
    const htmlMarkup = renderToString(
        <div data-hydration-component="su-{NAME_lowercase}">
            <{NAME_camelcase} {...args} />
        </div>,
    );

    return htmlMarkup;
};
