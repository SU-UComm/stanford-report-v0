module.exports = (props) => {
    let controls = {};

    Object.keys(props).forEach((propKey) => {
        if (props[propKey]?.enum) {
            // Select field
            controls[propKey] = {
                name: props[propKey].title,
                options: props[propKey].enum,
                control: {type: 'select'},
            };
        } else {
            // Text field
            controls[propKey] = {
                name: props[propKey].title,
                control: {type: 'text'},
            };
        }
    });

    console.log(controls);
    return controls;
};
