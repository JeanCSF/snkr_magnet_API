function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function removeDots(str) {
    return str.replace(/\./g, "");
}

async function clearSneakerName(sneakerNameObj) {
    const { sneakerName, brands, categories, productReference, colors } = sneakerNameObj;

    let clearedSneakerName = removeAccents(sneakerName);
    if (brands) {
        brands.forEach(brand => clearedSneakerName = clearedSneakerName.replace(brand, ''));
    }

    if (categories) {
        categories.forEach((category) => {
            if (category !== 'SLIP ON' && category !== 'GORE-TEX') {
                clearedSneakerName = clearedSneakerName.replace(category, '')
            }
        });
    }

    if (productReference) {
        if (brands[0] !== 'NEW BALANCE') {
            clearedSneakerName = clearedSneakerName.replace(productReference, '');
        }
    }

    if (colors) {
        colors.forEach(color => clearedSneakerName = clearedSneakerName.replace(color, ''));
    }

    const regex = new RegExp('\\b(' + colorsRegex.source + ')\\b', 'gi');
    clearedSneakerName = clearedSneakerName.toLowerCase().replace(regex, '');
    clearedSneakerName = clearedSneakerName.replace(/\b[xX]\b/g, '').replace(/\s+/g, ' ').replace("''", '').trim();

    return clearedSneakerName.replace(/[+-]/g, '').toUpperCase().trim();
}

module.exports = {
    removeAccents,
    removeDots,
    clearSneakerName
}