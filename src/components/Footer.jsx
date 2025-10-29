import { ArrowUp, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { useEffect, useState } from 'react'

const Footer = () => {
	const [scrollProgress, setScrollProgress] = useState(0)
	const [showScrollTop, setShowScrollTop] = useState(false)

	useEffect(() => {
		const scrollContainer = document.getElementById('scroll-container')
		if (!scrollContainer) return

		const handleScroll = () => {
			const scrollTop = scrollContainer.scrollTop
			const docHeight =
				scrollContainer.scrollHeight - scrollContainer.clientHeight
			const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
			setScrollProgress(progress)
			setShowScrollTop(scrollTop > 300)
		}

		scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
		return () => scrollContainer.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToTop = () => {
		const scrollContainer = document.getElementById('scroll-container')
		if (scrollContainer) {
			scrollContainer.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	const socialLinks = [
		{
			name: 'GitHub',
			url: 'https://github.com/xbobom0rod',
			icon: Github,
		},
		{
			name: 'LinkedIn',
			url: 'https://linkedin.com/in/bobomurod-xudayberganov',
			icon: Linkedin,
		},
		{
			name: 'Twitter',
			url: 'https://twitter.com/XBobomurod09',
			icon: Twitter,
		},
		{
			name: 'Email',
			url: 'mailto:xbobomurod50@gmail.com',
			icon: Mail,
		},
	]

	// Texnologiya linklari
	const techLinks = [
		{ name: 'React v19', url: 'https://react.dev/' },
		{ name: 'Vite v7', url: 'https://vitejs.dev/' },
		{ name: 'Tailwind v4', url: 'https://tailwindcss.com/' },
	]

	return (
		<>
			{/* Scroll Progress Bar */}
			<div
				className='fixed top-0 left-0 h-1 bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500 z-50 pointer-events-none'
				style={{ width: `${scrollProgress}%` }}
			/>

			{/* Back to Top Button */}
			{showScrollTop && (
				<button
					onClick={scrollToTop}
					className='fixed bottom-48 right-6 p-3 rounded-xl bg-gradient-to-br from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white shadow-xl shadow-green-500/50 transition-all duration-300 z-40 hover:scale-110 backdrop-blur-xl border border-green-400/50'
					aria-label='Back to top'
				>
					<ArrowUp size={20} />
				</button>
			)}

			{/* Status Bar Footer */}
			<footer className='bg-white/5 backdrop-blur-xl text-white text-xs md:text-sm py-3 px-4 flex justify-between items-center font-mono z-40 border-t border-white/20 h-14 shadow-xl'>
				{/* Left */}
				<div className='flex items-center gap-2 md:gap-4 truncate'>
					<span className='w-2 h-2 bg-green-400 rounded-full'></span>

					{/* React link */}
					<a
						href={techLinks[0].url}
						target='_blank'
						rel='noopener noreferrer'
						className='hidden sm:inline truncate text-gray-300 hover:text-green-400 transition-colors'
					>
						{techLinks[0].name}
					</a>

					<span className='hidden md:inline text-gray-400'>|</span>

					{/* Vite link */}
					<a
						href={techLinks[1].url}
						target='_blank'
						rel='noopener noreferrer'
						className='hidden md:inline truncate text-gray-300 hover:text-cyan-400 transition-colors'
					>
						{techLinks[1].name}
					</a>

					<span className='hidden lg:inline text-gray-400'>|</span>

					{/* Tailwind link */}
					<a
						href={techLinks[2].url}
						target='_blank'
						rel='noopener noreferrer'
						className='hidden lg:inline truncate text-gray-300 hover:text-blue-400 transition-colors'
					>
						{techLinks[2].name}
					</a>
				</div>

				{/* Center - Social */}
				<div className='flex items-center gap-3 mx-2'>
					{socialLinks.map(social => {
						const Icon = social.icon
						return (
							<a
								key={social.name}
								href={social.url}
								target='_blank'
								rel='noopener noreferrer'
								title={social.name}
								className='text-gray-300 hover:text-green-400 hover:scale-110 transition-all'
							>
								<Icon size={16} className='md:w-5 md:h-5' />
							</a>
						)
					})}
				</div>

				{/* Right */}
				<div className='flex items-center gap-2 md:gap-4 truncate text-right text-gray-300'>
					<span className='hidden sm:inline truncate'>
					 	&copy;	{new Date().getFullYear()}
					</span>

					<span className='truncate'>Bobomurod</span>
				</div>
			</footer>
		</>
	)
}

export default Footer
