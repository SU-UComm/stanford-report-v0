module.exports = async (input) => {
    return `<div>
        <p>${input.text}</p>
        ${input?.image?.imageVariations?.original?.url ? `<img src="${input.image.imageVariations.original.url}" alt="" />` : ''}
    </div>`;
};
