import React from 'react';
import {renderToString} from 'react-dom/server';

import SampleComponent from '../jsx/SampleComponent.jsx';

export default async (args, info) => {
    // Get the items from Matrix
    // const items = await getCards(args, info);

    // Define our component args
    const componentArgs = {
        ...args,
        // eventCards: items,
    };

    const htmlMarkup = renderToString(
        <div data-hydration-component="event-spotlight" data-hydration-props={JSON.stringify({...componentArgs})}>
            <SampleComponent {...componentArgs} />
        </div>,
    );

    return htmlMarkup;
};
