import React from 'react';
import {hydrate} from 'react-dom';

import {NAME_camelcase} from './jsx/{NAME_camelcase}.jsx';

document.querySelectorAll('[data-hydration-component="su-{NAME_lowercase}"]').forEach((element) => {
    const props = JSON.parse(element.dataset.hydrationProps);
    hydrate(<{NAME_camelcase} {...props} />, element);
});
