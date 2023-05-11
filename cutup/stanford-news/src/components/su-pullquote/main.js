module.exports = async (input) => {
    let alignmentClass;
    switch (input.alignment) {
        case 'left':
            alignmentClass = 'pull-left pull-left-narrow';
            break;
        case 'center':
            alignmentClass = 'align-center inset-width center-block';
            break;
        case 'right':
            alignmentClass = 'pull-right pull-right-narrow';
            break;
        default:
            alignmentClass = 'pull-right pull-right-narrow';
    }

    return `
    <div class="pullquote ${alignmentClass}">
        <img src="${input?.image?.imageVariations?.original?.url}" class="headshot" alt="${
        input.attribution
    }" decoding="async" srcset="https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square-100x100.jpg 100w, https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square-555x555.jpg 555w, https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square-795x795.jpg 795w, https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square-960x960.jpg 960w, https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square.jpg 1343w, https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square-100x100@2x.jpg 200w, https://news.stanford.edu/wp-content/uploads/2018/10/Kovscek_square-555x555@2x.jpg 1110w" sizes="(max-width: 100px) 100vw, 100px" loading="eager" />
        <blockquote>
            <p>“${input.quote}’”</p>
            <p class="quote-attrib">—${input.attribution}</p>
            <p class="quote-attrib supplemental">${input.description}</p>
        </blockquote>
    </div>
    <pre><code>
        ${JSON.stringify(input, null, 2)}
    </code></pre>`;
};
