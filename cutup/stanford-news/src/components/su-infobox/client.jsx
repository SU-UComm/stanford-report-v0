import React from 'react';
import {hydrate} from 'react-dom';

import Infobox from './jsx/Infobox.jsx';

document.querySelectorAll('[data-hydration-component="su-infobox"]').forEach((element) => {
    const props = JSON.parse(element.dataset.hydrationProps);
    hydrate(<Infobox {...props} />, element);
});
