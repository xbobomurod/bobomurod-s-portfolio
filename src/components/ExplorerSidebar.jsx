import {
	Boxes,
	ChevronDown,
	Folder,
	FolderOpen,
	Home,
	Mail,
	MapPin,
	User,
	X,
	Zap,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

const ExplorerSidebar = ({ isOpen, setIsOpen }) => {
	const [activeSection, setActiveSection] = useState('home')
	const [expandedFolders, setExpandedFolders] = useState({
		pages: true,
		components: false,
	})

	const location = useLocation()

	const sections = useMemo(
		() => [
			{ name: 'Home.jsx', id: 'home', icon: Home },
			{ name: 'About.jsx', id: 'about', icon: User },
			{ name: 'Skills.jsx', id: 'skills', icon: Zap },
			{ name: 'Projects.jsx', id: 'projects', icon: Boxes },
			{ name: 'Contact.jsx', id: 'contact', icon: Mail },
			{ name: 'Blog.jsx', id: 'blog', icon: MapPin, route: true },
		],
		[]
	)

	useEffect(() => {
		const scrollContainer = document.getElementById('scroll-container')
		if (!scrollContainer) return

		const handleScroll = () => {
			const scrollY = scrollContainer.scrollTop
			const offsets = sections
				.filter(s => !s.route)
				.map(section => {
					const el = document.getElementById(section.id)
					return {
						id: section.id,
						offsetTop: el ? el.offsetTop - 300 : 0,
					}
				})

			const current = offsets.reduce((prev, curr) =>
				scrollY >= curr.offsetTop ? curr : prev
			)

			setActiveSection(current.id)
		}

		if (location.pathname === '/') {
			scrollContainer.addEventListener('scroll', handleScroll, {
				passive: true,
			})
			handleScroll()
		}

		return () => {
			scrollContainer.removeEventListener('scroll', handleScroll)
		}
	}, [sections, location.pathname])

	const toggleFolder = folder => {
		setExpandedFolders(prev => ({
			...prev,
			[folder]: !prev[folder],
		}))
	}

	return (
		<>
			<aside
				className={`fixed top-20 left-0 bottom-0 w-64 bg-white/5 backdrop-blur-xl text-gray-300 font-mono text-sm transform transition-all duration-300 z-40 border-r border-white/20 flex flex-col overflow-hidden shadow-xl ${
					isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
				}`}
			>
				{/* Header */}
				<div className='p-4 border-b border-white/20 sticky top-0 bg-white/5 backdrop-blur-xl flex items-center justify-between'>
					<div className='flex items-center gap-2 text-green-400'>
						<Folder size={16} />
						<span className='font-semibold text-sm'>Explorer</span>
					</div>
					<button
						className='md:hidden p-1 hover:bg-white/10 rounded transition'
						onClick={() => setIsOpen(false)}
					>
						<X size={16} />
					</button>
				</div>

				{/* Pages Folder */}
				<div className='flex-1 overflow-y-auto p-3 space-y-1'>
					<button
						onClick={() => toggleFolder('pages')}
						className='w-full flex items-center gap-2 px-2 py-2 hover:bg-white/10 rounded transition text-gray-300 hover:text-white border border-transparent hover:border-white/20'
					>
						{expandedFolders.pages ? (
							<FolderOpen size={14} className='text-yellow-400' />
						) : (
							<Folder size={14} className='text-yellow-400' />
						)}
						<span className='text-xs'>pages</span>
						<ChevronDown
							size={12}
							className={`ml-auto transition-transform ${
								expandedFolders.pages ? 'rotate-180' : ''
							}`}
						/>
					</button>

					{expandedFolders.pages && (
						<div className='ml-2 space-y-1 border-l border-white/20 pl-2'>
							{sections.map(section => {
								const Icon = section.icon
								const isBlogActive =
									location.pathname === '/blog' && section.id === 'blog'

								if (section.route) {
									return (
										<RouterLink
											key={section.id}
											to='/blog'
											onClick={() => setIsOpen(false)}
											className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer rounded text-xs border transition ${
												isBlogActive
													? 'bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-300 border border-green-400/50 shadow-lg shadow-green-500/20'
													: 'text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 border-transparent'
											}`}
										>
											<Icon size={13} className='text-green-400' />
											<span>{section.name}</span>
										</RouterLink>
									)
								}

								return (
									<ScrollLink
										key={section.id}
										to={section.id}
										containerId='scroll-container'
										smooth={true}
										duration={500}
										offset={-100}
										onClick={() => {
											setActiveSection(section.id)
											setIsOpen(false)
										}}
										className={`flex items-center gap-2 px-3 py-1.5 rounded transition text-xs border border-transparent cursor-pointer ${
											activeSection === section.id && location.pathname === '/'
												? 'bg-gradient-to-r from-green-500/20 to-cyan-500/20 text-green-300 border border-green-400/50 shadow-lg shadow-green-500/20'
												: 'text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
										}`}
									>
										<Icon size={13} className='text-green-400' />
										<span>{section.name}</span>
									</ScrollLink>
								)
							})}
						</div>
					)}
				</div>

				{/* Components Folder */}
				<div className='p-3 border-t border-white/20 bg-white/5 backdrop-blur-xl text-xs text-gray-500'>
					<div className='flex items-center gap-2'>
						<span className='w-2 h-2 bg-green-400 rounded-full'></span>
						<span>6 Pages</span>
					</div>
					<div className='flex items-center gap-2'>
						<span className='w-2 h-2 bg-blue-400 rounded-full'></span>
						<span>3 Components</span>
					</div>
				</div>
			</aside>

			{isOpen && (
				<div
					className='fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-30 mt-20'
					onClick={() => setIsOpen(false)}
				></div>
			)}
		</>
	)
}

export default ExplorerSidebar
