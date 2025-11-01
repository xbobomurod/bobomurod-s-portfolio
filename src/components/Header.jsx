import { Code2, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

const Header = () => {
	const [activeSection, setActiveSection] = useState('home')
	const [isScrolled, setIsScrolled] = useState(false)
	const [showMobileNav, setShowMobileNav] = useState(false)

	const navigate = useNavigate()
	const location = useLocation()

	const navItems = [
		{ name: 'Home', id: 'home' },
		{ name: 'About', id: 'about' },
		{ name: 'Skills', id: 'skills' },
		{ name: 'Projects', id: 'projects' },
		{ name: 'Contact', id: 'contact' },
		{ name: 'Blog', id: 'blog' },
	]

	useEffect(() => {
		const scrollContainer = document.getElementById('scroll-container')
		let rafId

		const handleScroll = () => {
			const scrollY = scrollContainer?.scrollTop || 0
			setIsScrolled(scrollY > 50)

			const offsets = navItems.map(item => {
				const el = document.getElementById(item.id)
				return {
					id: item.id,
					offsetTop: el ? el.offsetTop - 300 : 0,
				}
			})

			const current = offsets.reduce((prev, curr) =>
				scrollY >= curr.offsetTop ? curr : prev
			)

			setActiveSection(current.id)
		}

		if (scrollContainer) {
			scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
			handleScroll()
		}

		return () => {
			if (scrollContainer) scrollContainer.removeEventListener('scroll', handleScroll)
			if (rafId) cancelAnimationFrame(rafId)
		}
	}, [])

	// ✅ ScrollLink’ni umumiy onClick function bilan boshqaramiz
	const handleNavClick = (itemId) => {
		if (itemId === 'blog') return // blog uchun router ishlaydi

		if (location.pathname !== '/') {
			navigate('/')
			setTimeout(() => {
				const el = document.getElementById(itemId)
				if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
			}, 400)
		}
	}

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
				isScrolled
					? 'bg-[#0f111a]/95 backdrop-blur-lg border-b border-white/10 shadow-lg'
					: 'bg-transparent'
			}`}
		>
			<div className='flex items-center justify-between py-3 px-4 md:px-8 h-20'>
				{/* Logo */}
				<div className='flex items-center gap-3 flex-shrink-0'>
					<div className='w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-lg'>
						<Code2 size={22} className='text-white' />
					</div>
					<div className='hidden sm:flex flex-col'>
						<h1 className='text-sm md:text-base font-bold text-white'>Bobomurod</h1>
						<p className='text-xs text-gray-400'>Developer</p>
					</div>
				</div>

				{/* Desktop Navigation */}
				<nav className='hidden lg:flex gap-1 bg-[#1e1e2f]/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/10'>
					{navItems.map(item => {
						if (item.id === 'blog') {
							return (
								<Link
									key={item.id}
									to='/blog'
									className='px-4 py-2 text-sm font-medium cursor-pointer rounded-full transition-all duration-300 text-gray-300 hover:text-white hover:bg-white/10'
								>
									{item.name}
								</Link>
							)
						}

						return (
							<ScrollLink
								key={item.id}
								to={item.id}
								containerId='scroll-container'
								smooth={true}
								duration={500}
								offset={-100}
								onClick={() => handleNavClick(item.id)}
								className={`px-4 py-2 text-sm font-medium cursor-pointer rounded-full transition-all duration-300 ${
									activeSection === item.id
										? 'text-white bg-green-500/20 border border-green-500/50'
										: 'text-gray-300 hover:text-white hover:bg-white/10'
								}`}
							>
								{item.name}
							</ScrollLink>
						)
					})}
				</nav>

				{/* Right Actions */}
				<div className='flex items-center gap-3 flex-shrink-0'>
					<a
						href='https://github.com/xbobomurod'
						target='_blank'
						rel='noopener noreferrer'
						className='hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-[#1e1e2f]/50 hover:bg-[#1e1e2f] border border-white/10 hover:border-green-400/50 text-gray-300 hover:text-green-400 transition-all duration-300'
					>
						GitHub
					</a>

					{/* Mobile Menu */}
					<button
						onClick={() => setShowMobileNav(!showMobileNav)}
						className='lg:hidden p-2 hover:bg-white/10 rounded-lg text-white transition'
					>
						{showMobileNav ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			{showMobileNav && (
				<div className='lg:hidden bg-[#1e1e2f] border-t border-white/10'>
					<nav className='flex flex-col p-2'>
						{navItems.map(item => {
							if (item.id === 'blog') {
								return (
									<Link
										key={item.id}
										to='/blog'
										className='px-4 py-2 text-sm font-medium cursor-pointer rounded-full transition-all duration-300 text-gray-300 hover:text-white hover:bg-white/10'
									>
										{item.name}
									</Link>
								)
							}

							return (
								<ScrollLink
									key={item.id}
									to={item.id}
									containerId='scroll-container'
									smooth={true}
									duration={500}
									offset={-100}
									onClick={() => {
										setShowMobileNav(false)
										handleNavClick(item.id)
									}}
									className={`px-4 py-2 text-sm font-medium cursor-pointer rounded-full transition-all duration-300 ${
										activeSection === item.id
											? 'text-white bg-green-500/20 border border-green-500/50'
											: 'text-gray-300 hover:text-white hover:bg-white/10'
									}`}
								>
									{item.name}
								</ScrollLink>
							)
						})}
					</nav>
				</div>
			)}
		</header>
	)
}

export default Header
