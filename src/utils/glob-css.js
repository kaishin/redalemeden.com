module.exports = {
	customMedia: {
		'--full-grid-container': '(width >= 60rem)'
	},
	customProperties: {
		'--primary-color-hsl': '258deg 69% 40%',
		'--primary-color': 'hsl(var(--primary-color-hsl))',
		'--secondary-color-hsl': '38deg 100% 75%',
		'--secondary-color': 'hsl(var(--secondary-color-hsl))',
		'--light-theme-bg-color': '#fff7e6',
		'--footer-padding': '2rem',
		'--header-top-spacing': '4rem',
		'--main-container-padding': '10vw',
		'--grid-container-full-width': '60rem',
		'--sidebar-max-width': '22.5rem',
		'--main-content-max-width': '40rem',
		'--font-rubik': '\'Rubik\'',
		'--text-font': 'var(--font-rubik), system-ui',
		'--header-title-size': '1.1rem'
	},
	customSelectors: {
		':--heading': 'h1, h2, h3, h4, h5, h6'
	}
};
