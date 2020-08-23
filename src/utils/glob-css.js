module.exports = {
	customMedia: {
		'--dark-mode': '(prefers-color-scheme: dark)',
		'--light-mode': '(prefers-color-scheme: light)',
		'--full-grid-container': '(width >= 60rem)',
		'--narrow-grid-container': '(width < 60rem)',
		'--full-width-image': '(width < 450px)'
	},
	customProperties: {
		'--footer-padding': '2rem',
		'--grid-container-full-width': '60rem',
		'--header-top-spacing': '4rem',
		'--image-vertical-spacing': '2rem',
		'--main-content-max-width': '40rem',
		'--sidebar-max-width': '22.5rem',
		'--spacing-default': '1rem',
		'--main-container-padding': '6rem',
		'--sheet-margin-top': 'var(--main-container-padding)',
		'--font-fira': '\'Fira Mono\'',
		'--font-inter': '\'Inter\'',
		'--header-title-size': '1.1rem',
		'--blog-body-size': '1.125rem',
		'--text-font': 'var(--font-inter), system-ui',
		'--monospaced-font': 'var(--font-fira), monospace',
		'--link-transition': 'all 0.2s linear',
		'--itunes-link-color': '#58a5ff',
		'--itunes-line-color': 'color-mod(var(--itunes-link-color) alpha(60%))',
		'--itunes-image-size': '90px',
		'--itunes-secondary-color': '#6682a9',
		'--itunes-content-left-inset': '2rem',
		'--itunes-container-max-width': '40rem',
		'--syndicate-color': '#e9f2f4',
		'--syndicate-border': '1px solid color-mod(var(--syndicate-color) shade(10%))',
		'--syndicate-cta-color': '#4a8794',
		'--pip-color': '#222222',
		'--pip-border': '1px solid color-mod(var(--pip-color) tint(10%))',
		'--pip-cta-color': '#3bc3a3',
		'--nope-color': '#f95d5e',
		'--nope-border': '1px solid color-mod(var(--nope-color) alpha(25%))',
		'--nope-cta-color': 'color-mod(var(--nope-color) shade(5%))'
	},
	customSelectors: {
		':--heading': 'h1, h2, h3, h4, h5, h6'
	}
};
