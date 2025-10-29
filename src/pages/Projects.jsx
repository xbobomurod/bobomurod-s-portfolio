const projects = [
	{
		title: 'Lexbridge Academy',
		description:
			'A comprehensive learning platform offering courses on various topics, built with React and Tailwind CSS.',
		link: 'https://github.com/xbobomurod/lexbridge-academy',
		demo: 'https://lexbridge-academy.vercel.app/',
	},
	{
		title: 'Game Finder App',
		description:
			'A web application that allows users to search for games, view details, and filter by genre, built with React and the RAWG API.',
		link: 'https://github.com/Khbobomurod/game-finder',
		demo: 'https://game-finder-rho.vercel.app/',
	},
	{
		title: 'Test Platform',
		description:
			'A platform for creating and taking quizzes, featuring user authentication, quiz management, and real-time results, built with Html, CSS, and JavaScript.',
		link: 'https://github.com/xbobomurod/Test',
		demo: 'https://test-pro-site.vercel.app/',
	},
		{
		title: 'Blog Site',
		description:
			'A personal blog site where users can read articles on various topics, built with React Tailwind CSS and Vite.',
		link: 'https://github.com/ix1osbek/ixlosware_blog',
		demo: 'https://ixlosware.uz/',
	},
]

const Projects = () => (
	<section
		id='projects'
		className='relative min-h-screen flex flex-col items-center bg-[#0f111a] overflow-hidden pt-24 px-4 z-10'
	>
		{/* Grid Overlay */}
		<div className='absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03) 1px,transparent 1px)] bg-[size:30px_30px] pointer-events-none'></div>

		{/* Gradient Blobs */}
		<div className='absolute w-96 h-96 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 opacity-20 rounded-full blur-[120px] top-20 left-10 animate-blob pointer-events-none'></div>
		<div className='absolute w-96 h-96 bg-gradient-to-tr from-pink-400 via-red-500 to-yellow-500 opacity-20 rounded-full blur-[120px] bottom-20 right-10 animate-blob delay-500 pointer-events-none'></div>

		{/* Section Title */}
		<h2 className='text-gray-400 font-mono text-sm mb-6 w-full max-w-4xl'>
			// My Projects
		</h2>

		<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10'>
			{projects.map((project, idx) => (
				<div
					key={idx}
					className='bg-[#1e1e2f] rounded-lg shadow-lg p-6 border border-white/10 text-gray-300 font-mono text-sm hover:scale-[1.02] transition'
				>
					<h3 className='text-green-400 text-lg mb-2'>{project.title}</h3>
					<p className='mb-4 leading-relaxed'>{project.description}</p>
					<div className='flex gap-4'>
						<a
							href={project.link}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-400 hover:underline cursor-pointer'
						>
							View on GitHub
						</a>
						<a
							href={project.demo}
							target='_blank'
							rel='noopener noreferrer'
							className='text-green-400 hover:underline cursor-pointer'
						>
							View Demo
						</a>
					</div>
				</div>
			))}
		</div>
	</section>
)

export default Projects
