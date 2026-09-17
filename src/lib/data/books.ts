export type BookCategory = {
	id: string;
	name: string;
	tagline: string;
	/** Hue used for the generated cover (0-360). */
	hue: number;
};

export type Book = {
	title: string;
	author: string;
	blurb: string;
	category: BookCategory['id'];
	/** Optional real cover image. When absent, a generated cover is shown. */
	cover?: string;
	url?: string;
};

export const categories: BookCategory[] = [
	{
		id: 'product',
		name: 'Product craft',
		tagline: 'What the job actually is, and how to do it well.',
		hue: 14
	},
	{
		id: 'discovery',
		name: 'Customer discovery',
		tagline: 'Finding out whether the pain is real before building anything.',
		hue: 152
	},
	{
		id: 'design',
		name: 'Design & UX',
		tagline: 'Making things people understand without thinking.',
		hue: 262
	},
	{
		id: 'strategy',
		name: 'Strategy & decisions',
		tagline: 'Frameworks I reach for when the answer is not obvious.',
		hue: 214
	},
	{
		id: 'marketing',
		name: 'Positioning & writing',
		tagline: 'Saying the right thing, to the right people, in words that land.',
		hue: 38
	},
	{
		id: 'management',
		name: 'Management & people',
		tagline: 'Leading a team, giving feedback, having the hard conversations.',
		hue: 340
	}
];

export const books: Book[] = [
	// Product craft
	{
		title: 'Product Management in Practice',
		author: 'Matt LeMay',
		category: 'product',
		blurb:
			'The most honest picture of what a product manager actually does day to day, and the few things that really matter in the role.'
	},
	{
		title: 'Inspired',
		author: 'Marty Cagan',
		category: 'product',
		blurb:
			'The reference on how the best tech companies build products: empowered teams, continuous discovery, and outcomes over output.'
	},
	{
		title: 'Empowered',
		author: 'Marty Cagan & Chris Jones',
		category: 'product',
		blurb:
			'The follow-up to Inspired, aimed at leaders. How to coach product people and give teams problems to solve instead of features to ship.'
	},
	{
		title: 'Running Lean',
		author: 'Ash Maurya',
		category: 'product',
		blurb:
			'One of the most useful books here. Break a product down into its risks, then attack them one at a time, in the right order, fast.'
	},

	// Customer discovery
	{
		title: 'The Mom Test',
		author: 'Rob Fitzpatrick',
		category: 'discovery',
		blurb:
			'How to talk to customers so they cannot lie to you. Essential for knowing whether there is a real pain behind the polite feedback.'
	},
	{
		title: 'Lean Customer Development',
		author: 'Cindy Alvarez',
		category: 'discovery',
		blurb:
			'A practical playbook for focusing discovery on the few assumptions that matter and testing them efficiently.'
	},
	{
		title: 'Competing Against Luck',
		author: 'Clayton Christensen',
		category: 'discovery',
		blurb:
			'The classic on jobs-to-be-done. People do not buy products, they hire them to make progress in their lives.'
	},

	// Design & UX
	{
		title: 'The Design of Everyday Things',
		author: 'Don Norman',
		category: 'design',
		blurb:
			'Fundamental design concepts that apply to doors and kettles as much as to software. Affordances, signifiers, feedback, and why users are never to blame.'
	},
	{
		title: 'Refactoring UI',
		author: 'Adam Wathan & Steve Schoger',
		category: 'design',
		blurb:
			'Extremely tactical. Concrete tricks on spacing, hierarchy, color and typography that make an interface look right.'
	},
	{
		title: "Don't Make Me Think",
		author: 'Steve Krug',
		category: 'design',
		blurb:
			'The key idea: the number of clicks does not matter, what matters is how much thinking each click requires.'
	},

	// Strategy & decisions
	{
		title: 'Good Strategy / Bad Strategy',
		author: 'Richard Rumelt',
		category: 'strategy',
		blurb:
			'A framework I use weekly: a real strategy is a diagnosis, a guiding policy and coherent actions. Everything else is goals dressed up as strategy.'
	},
	{
		title: "Poor Charlie's Almanack",
		author: 'Charlie Munger',
		category: 'strategy',
		blurb:
			'Mental models, inversion and the art of not being stupid. As useful for running a company as for investing.'
	},
	{
		title: 'Algorithms to Live By',
		author: 'Brian Christian & Tom Griffiths',
		category: 'strategy',
		blurb:
			'A very good way to think. Computer science ideas turned into tools for everyday decisions: when to explore, when to commit, when to stop.'
	},

	// Positioning & writing
	{
		title: 'Obviously Awesome',
		author: 'April Dunford',
		category: 'marketing',
		blurb:
			'A masterclass on positioning B2B software. Pick the context that makes your strengths obvious, then build everything around it.'
	},
	{
		title: 'The Boron Letters',
		author: 'Gary Halbert',
		category: 'marketing',
		blurb:
			'Letters from a copywriter to his son. How to write clearly and persuasively, and why the list matters more than the pitch.'
	},
	{
		title: 'Ogilvy on Advertising',
		author: 'David Ogilvy',
		category: 'marketing',
		blurb:
			'Still the best primer if you ever have to run a marketing campaign for a product. Research first, then write like a human.'
	},

	// Management & people
	{
		title: 'High Output Management',
		author: 'Andrew Grove',
		category: 'management',
		blurb:
			'The framework for management. Leverage, one-on-ones, and the idea that a manager’s output is the output of their team.'
	},
	{
		title: 'Crucial Conversations',
		author: 'Patterson, Grenny, McMillan & Switzler',
		category: 'management',
		blurb:
			'How to have high-stakes conversations while keeping the relationship intact and still getting to a decision.'
	},
	{
		title: 'Radical Candor',
		author: 'Kim Scott',
		category: 'management',
		blurb:
			'Care personally, challenge directly. How to give feedback and manage in a way that is both frank and kind.'
	}
];

export function booksIn(categoryId: string): Book[] {
	return books.filter((b) => b.category === categoryId);
}
