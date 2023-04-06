const fetch = require('node-fetch');

module.exports = async (input) => {
    const response = await fetch('http://127.0.0.1:8888/return_json');
    const jsonData = await response.json();

    return `
        <div class="su-flex su-justify-center">
            <div class="${Object.values(input.bgColor)[0]} ${Object.values(input.textColor)[0]} su-px-30 su-py-10 su-max-w-500">
                <p class="currentDate"></p>
                <p>${input.content}</p>
                <p>${JSON.stringify(jsonData)}</p>
            </div>
        </div>
    `;
};
