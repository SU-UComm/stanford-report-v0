import React from 'react';
import {hydrate} from 'react-dom';

import SampleComponent from '../jsx/SampleComponent.jsx';

document.querySelectorAll('[data-hydration-component="su-react_component"]').forEach((element) => {
    const props = JSON.parse(element.dataset.hydrationProps);
    hydrate(<SampleComponent {...props} />, element);
});
