module.exports = {
	customMedia: {
		'--narrow-window': '(max-width: 30em)'
	},
	customProperties: {
		'--primary-color-hsl': '258deg 69% 40%',
		'--primary-color': 'hsl(var(--primary-color-hsl))',
		'--secondary-color-hsl': '38deg 100% 75%',
		'--secondary-color': 'hsl(var(--secondary-color-hsl))',
		'--spacing-header-top': '4rem',
		'--padding-main-container': '10vw',
		'--font-rubik': '\'Rubik\'',
		'--text-font': 'var(--font-rubik), system-ui',
		'--header-title-size': '1.1rem'
	},
	customSelectors: {
		':--heading': 'h1, h2, h3, h4, h5, h6'
	}
};
