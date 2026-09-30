export const site = {
	name: 'Grégoire Démogé',
	title: 'Grégoire Démogé',
	description:
		'Product & growth co-founder at FullEnrich. Into AI, growth, data, finance and product organization. Plus the books I recommend to a lot of people.',
	url: 'https://gregoiredemoge.com',
	links: {
		linkedin: 'https://www.linkedin.com/in/demoge/',
		fullenrich: 'https://fullenrich.com'
	}
};

export type Company = {
	name: string;
	url: string;
	note: string;
};

export const companies: Company[] = [
	{ name: 'MeilleursAgents', url: 'https://www.meilleursagents.com/', note: 'exited for €200m' },
	{ name: 'Moka.care', url: 'https://www.moka.care/', note: 'raised €15m' },
	{ name: 'Hiresweet', url: 'https://www.hiresweet.com/', note: 'YC W19' },
	{ name: 'LaGrowthMachine', url: 'https://lagrowthmachine.com', note: 'bootstrapped' },
	{ name: 'HappyPal', url: 'https://www.happypal.fr/', note: 'fully designed the V1 from scratch' }
];
