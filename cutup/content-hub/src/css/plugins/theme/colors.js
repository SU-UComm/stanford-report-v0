/**
 * Stanford's official color palette from the Identity Guide
 * https://identity.stanford.edu/design-elements/color/
 */
module.exports = function () {
    return {
        transparent: 'transparent',
        current: 'currentColor',
        inherit: 'inherit',
        // Primary Colors
        // https://identity.stanford.edu/design-elements/color/primary-colors/
        'cardinal-red': {
            DEFAULT: '#8C1515', // Stanford main brand color
            light: '#B83A4B',
            dark: '#820000',
        },
        black: {
            DEFAULT: '#2E2D29', // Default text color on light background
            90: '#43423E',
            80: '#585754',
            70: '#6D6C69',
            60: '#767674',
            50: '#979694',
            40: '#ABABA9',
            30: '#C0C0BF',
            20: '#D5D5D4',
            10: '#EAEAEA',
            true: '#000000', // For when a higher contrast is needed
        },
        gray: {
            DEFAULT: '#C9C9C9',
            dark: '#53565A',
            light: '#F0F0F0',
        },
        green: '#009B76',
        red: {
            DEFAULT: '#E50808',
            dark: '#B1040E',
            darker: '#820000',
        },
        white: '#FFFFFF',
        // Commonly used social media brand colors
        facebook: '#4267B2',
        twitter: '#1DA1F2',
        instagram: '#E1306C',
        linkedin: '#0077B5',
        youtube: '#FF0000',
    };
};
