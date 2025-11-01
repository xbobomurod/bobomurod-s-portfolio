import { useEffect, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'

const Home = () => {
	const cursorRef = useRef(null)
	const [showCursor, setShowCursor] = useState(true)

	useEffect(() => {
		const handleResize = () => {
			setShowCursor(window.innerWidth >= 1024)
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		const moveCursor = e => {
			const cursor = cursorRef.current
			if (cursor) {
				cursor.style.left = `${e.clientX}px`
				cursor.style.top = `${e.clientY}px`
			}
		}

		if (showCursor) {
			window.addEventListener('mousemove', moveCursor)
		} else {
			window.removeEventListener('mousemove', moveCursor)
		}

		return () => window.removeEventListener('mousemove', moveCursor)
	}, [showCursor])

	return (
		<>
			<section
				id='home'
				className='relative min-h-screen flex flex-col justify-center items-center text-center bg-[#0f111a] overflow-hidden pt-24 px-4 sm:px-6 md:px-8'
			>
				{/* Grid Overlay */}
				<div className='absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05) 1px,transparent 1px)] bg-[size:30px_30px]'></div>

				{/* Glowing Blobs */}
				<div className='absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-amber-400 via-fuchsia-500 to-lime-400 opacity-20 rounded-full blur-[100px] sm:blur-[120px] top-5 left-5 sm:top-10 sm:left-10 animate-blob'></div>
				<div className='absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-tr from-green-500 via-cyan-500 to-teal-500 opacity-20 rounded-full blur-[100px] sm:blur-[120px] bottom-5 right-5 sm:bottom-10 sm:right-10 animate-blob delay-500'></div>

				{/* Custom Cursor (Desktop Only) */}
				{showCursor && (
					<div
						ref={cursorRef}
						className='hidden lg:block fixed z-50 w-4 h-4 bg-white rounded-full pointer-events-none mix-blend-difference transition-transform duration-150'
					></div>
				)}

				{/* Fake Code Comment */}
				<h2 className='text-gray-400 text-left w-full max-w-3xl font-mono text-xs sm:text-sm mb-4'>
					// Welcome to my Portfolio
				</h2>

				{/* Fake Terminal */}
				<div className='relative z-10 w-full max-w-3xl bg-[#1e1e2f] text-left text-green-400 p-3 sm:p-4 rounded-md shadow-lg font-mono text-xs sm:text-sm md:text-base mb-10'>
					<p>
						<span className='text-blue-400'>bobomurod@portfolio</span>:~$ npm
						start
					</p>
					<p>Starting the development server...</p>
					<p>✔ Compiled successfully!</p>
					<p>
						Open{' '}
						<a href='https://kh-bobomurod-s-portfolio.vercel.app/' className='underline text-blue-400'>
							localhost://3000
						</a>{' '}
						to view it in the browser.
					</p>
				</div>

				{/* Main Heading */}
				<h1 className='text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 text-white animate-fade-in'>
					Kh Bobomurod
				</h1>

				{/* Typing Animation */}
				<TypeAnimation
					sequence={[
						'Frontend Developer',
						3000,
						'Creative Coder',
						3000,
						'Tech Enthusiast',
						3000,
						
					]}
					wrapper='span'
					speed={50}
					repeat={Infinity}
					className='text-lg sm:text-xl md:text-2xl max-w-2xl mb-10 text-green-300 animate-fade-in delay-200'
				/>
			</section>
		</>
	)
}

export default Home
