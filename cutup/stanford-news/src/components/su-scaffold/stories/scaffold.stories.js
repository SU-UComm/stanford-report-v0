import * as Component from '../main';
import inputData from '../data/sample.json';
import propsToControls from '../../../../scripts/stortbook-helpers/propsToControls';
import manifest from '../manifest.json';

export default {
    title: 'Scaffold',
    argTypes: propsToControls(manifest.functions[0].input.properties),
};

const Template = ({label, ...args}) => {
    const container = document.createElement('div');
    const script = document.createElement('script');
    script.src = 'http://127.0.0.1:4000/js/global.js';

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'http://127.0.0.1:8080/css/output.css';
    link.type = 'text/css';
    link.media = 'all';

    Component(args).then((html) => {
        container.innerHTML = html;
        container.appendChild(script);
        container.appendChild(link);
    });

    return container;
};

export const Primary = Template.bind({});
Primary.args = {
    bgColor: inputData.bgColor,
    textColor: inputData.textColor,
    content: inputData.content,
};
