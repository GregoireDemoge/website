export const site = {
	name: 'Grégoire Démogé',
	shortName: 'Greg',
	title: 'Grégoire Démogé',
	description:
		'Product & growth co-founder at FullEnrich. Notes on AI, growth, data, finance and how product teams are organized, plus the books I keep recommending.',
	url: 'https://gregoiredemoge.com',
	links: {
		linkedin: 'https://www.linkedin.com/in/demoge/',
		fullenrich: 'https://fullenrich.com'
	}
};

export type Topic = {
	name: string;
	blurb: string;
};

export const topics: Topic[] = [
	{
		name: 'AI',
		blurb:
			'Where most of my time goes now. Building products on top of models, and rebuilding how a company works when agents do part of the work.'
	},
	{
		name: 'Growth',
		blurb:
			'Product-led growth, self-serve funnels, activation and pricing. The plumbing between what a product does and who ends up paying for it.'
	},
	{
		name: 'Data',
		blurb:
			'Getting product, sales and finance to look at the same numbers. Modeling, instrumentation, and the discipline to trust the data over the story.'
	},
	{
		name: 'Finance',
		blurb:
			'Unit economics, capital allocation and the long game. I read a lot of investor letters and I think about strategy the way an owner would.'
	},
	{
		name: 'Product org',
		blurb:
			'How teams are shaped, what they own, how decisions get made. Empowered teams, small surface areas, and fewer meetings than you think.'
	}
];

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
	{ name: 'HappyPal', url: 'https://www.happypal.fr/', note: 'designed the V1 from scratch' }
];
