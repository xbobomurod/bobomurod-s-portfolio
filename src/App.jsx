import { Analytics } from '@vercel/analytics/react'
import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ExplorerSidebar from './components/ExplorerSidebar'
import Footer from './components/Footer'
import Header from './components/Header'
import TerminalPanel from './components/TerminalPanel'
import About from './pages/About'
import AdminBlog from './pages/AdminBlog'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Skills from './pages/Skills'

function App() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<Router>
			<div className='flex h-screen bg-[#0a0e27] text-white font-mono overflow-hidden'>
				{/* Sidebar */}
				<ExplorerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

				{/* Main Content Area */}
				<div className='flex flex-col flex-1 w-full overflow-hidden'>
					{/* Header */}
					<Header
						isSidebarOpen={isSidebarOpen}
						setIsSidebarOpen={setIsSidebarOpen}
					/>

					{/* Routes */}
					<main
						id='scroll-container'
						className='flex-1 overflow-y-auto scroll-smooth'
					>
						<Routes>
							{/* 👇 Main SPA section */}
							<Route
								path='/'
								element={
									<div>
										<section id='home'>
											<Home />
										</section>
										<section id='about'>
											<About />
										</section>
										<section id='skills'>
											<Skills />
										</section>
										<section id='projects'>
											<Projects />
										</section>
										<section id='contact'>
											<Contact />
										</section>
									</div>
								}
							/>

							{/* 👇 Blog Page — alohida ochiladi */}
							<Route path='/blog' element={<Blog />} />
							<Route path='/admina' element={<AdminBlog />} />
						</Routes>
					</main>

					{/* Terminal Panel */}
					<TerminalPanel />

					{/* Footer */}
					<Footer />
					<Analytics />
				</div>
			</div>
		</Router>
	)
}

export default App
