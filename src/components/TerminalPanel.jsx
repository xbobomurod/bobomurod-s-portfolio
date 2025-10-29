import { ChevronDown, ChevronUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const TerminalPanel = () => {
	const terminalRef = useRef(null)
	const [logs, setLogs] = useState([])
	const [isMinimized, setIsMinimized] = useState(true)
	const logsCountRef = useRef(0)

	const terminalLines = [
		'bobomurod@portfolio:~$ npm start',
		'',
		'> Vite v7.0 dev server running',
		'✔ Compiled successfully!',
		'✔ Hot Module Replacement enabled',
		'',
		'Local:   http://localhost:5173',
		'ready in 1234 ms.',
	]

	useEffect(() => {
		let timeoutIds = []

		terminalLines.forEach((line, idx) => {
			const timeoutId = setTimeout(() => {
				if (logsCountRef.current < terminalLines.length) {
					setLogs(prev => [...prev, line])
					logsCountRef.current++
				}
			}, idx * 150)
			timeoutIds.push(timeoutId)
		})

		return () => timeoutIds.forEach(id => clearTimeout(id))
	}, [])

	useEffect(() => {
		if (terminalRef.current && !isMinimized) {
			terminalRef.current.scrollTop = terminalRef.current.scrollHeight
		}
	}, [logs, isMinimized])

	if (isMinimized) {
		return (
			<div className='hidden md:block fixed bottom-20 left-4 z-30'>
				<button
					onClick={() => setIsMinimized(false)}
					className='p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:border-green-400/50 text-green-400 hover:text-green-300 transition-all hover:shadow-lg hover:shadow-green-400/30 shadow-xl'
					title='Open Terminal'
				>
					<ChevronUp size={20} />
				</button>
			</div>
		)
	}

	return (
		<div className='flex flex-col bg-white/5 backdrop-blur-xl border-t border-white/20 h-40 shadow-xl'>
			{/* Terminal Header */}
			<div className='flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/20 flex-shrink-0'>
				<div className='flex items-center gap-3'>
					<div className='flex gap-1.5'>
						<div className='w-2.5 h-2.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50'></div>
						<div className='w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50'></div>
						<div className='w-2.5 h-2.5 rounded-full bg-green-500 shadow-lg shadow-green-500/50'></div>
					</div>
					<span className='text-xs font-semibold text-white ml-2'>Terminal</span>
					<span className='text-xs text-gray-400'>npm start</span>
				</div>

				<button
					onClick={() => setIsMinimized(true)}
					className='p-1 hover:bg-white/10 rounded transition text-gray-400 hover:text-white'
					title='Minimize'
				>
					<ChevronDown size={16} />
				</button>
			</div>

			{/* Terminal Content */}
			<div
				ref={terminalRef}
				className='flex-1 overflow-y-auto p-4 space-y-1 text-green-400 text-xs font-mono'
			>
				{logs.map((line, index) => (
					<div key={index} className='whitespace-pre-wrap leading-relaxed'>
						{line || ' '}
					</div>
				))}
				{logs.length > 0 && (
					<span className='inline-block w-1.5 h-3 bg-green-400 animate-pulse ml-0.5'></span>
				)}
			</div>
		</div>
	)
}

export default TerminalPanel