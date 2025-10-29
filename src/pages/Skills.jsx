import { Code2, Database, Palette, Terminal } from 'lucide-react'

const Skills = () => {
	const skillCategories = [
		{
			icon: Code2,
			title: 'Frontend',
			skills: ['React', 'JavaScript', 'Tailwind CSS', 'HTML/CSS', 'Vite'],
		},
		{
			icon: Database,
			title: 'Backend & Tools',
			skills: ['Node.js', 'Git', 'REST APIs', 'JSON', 'npm/yarn'],
		},
		{
			icon: Palette,
			title: 'Design',
			skills: ['UI Design', 'Responsive Design', 'Animations', 'Figma', 'UX/UI'],
		},
		{
			icon: Terminal,
			title: 'Other Skills',
			skills: ['Problem Solving', 'Team Work', 'Communication', 'Learning', 'Teaching'],
		},
	]

	return (
		<section
			id='skills'
			className='relative min-h-screen flex flex-col items-center bg-[#0f111a] overflow-hidden pt-24 px-4 z-10'
		>
			{/* Grid Overlay */}
			<div className='absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03) 1px,transparent 1px)] bg-[size:30px_30px] pointer-events-none'></div>

			{/* Gradient Blobs */}
			<div className='absolute w-96 h-96 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 opacity-20 rounded-full blur-[120px] top-20 left-10 animate-blob pointer-events-none'></div>
			<div className='absolute w-96 h-96 bg-gradient-to-tr from-teal-400 via-green-500 to-lime-500 opacity-20 rounded-full blur-[120px] bottom-20 right-10 animate-blob delay-500 pointer-events-none'></div>

			{/* Section Title */}
			<h2 className='text-gray-400 font-mono text-sm mb-6 w-full max-w-4xl'>
				// My Skills
			</h2>

			{/* Skills Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10 mb-12'>
				{skillCategories.map((category, idx) => {
					const Icon = category.icon
					return (
						<div
							key={idx}
							className='bg-[#1e1e2f] rounded-lg shadow-lg p-6 border border-white/10 hover:border-green-400/50 transition group cursor-pointer'
						>
							{/* Icon and Title */}
							<div className='flex items-center gap-3 mb-4'>
								<div className='p-2 bg-green-400/20 rounded-lg group-hover:bg-green-400/40 transition'>
									<Icon className='text-green-400 w-6 h-6' />
								</div>
								<h3 className='text-green-400 text-lg font-semibold'>
									{category.title}
								</h3>
							</div>

							{/* Skills Tags */}
							<div className='flex flex-wrap gap-2'>
								{category.skills.map((skill, i) => (
									<span
										key={i}
										className='px-3 py-1 bg-[#2c2c3a] border border-green-400/30 text-gray-300 text-sm rounded-full hover:bg-green-400/10 hover:border-green-400 transition'
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					)
				})}
			</div>

			{/* Bottom Stats */}
			<div className='w-full max-w-4xl grid grid-cols-3 gap-4 z-10'>
				{[
					{ label: 'Languages', value: '3+' },
					{ label: 'Frameworks', value: '5+' },
					{ label: 'Tools', value: '10+' },
				].map((stat, idx) => (
					<div
						key={idx}
						className='bg-[#1e1e2f] rounded-lg p-4 border border-white/10 text-center hover:scale-105 transition'
					>
						<p className='text-2xl font-bold text-green-400'>{stat.value}</p>
						<p className='text-gray-400 text-sm'>{stat.label}</p>
					</div>
				))}
			</div>
		</section>
	)
}

export default Skills