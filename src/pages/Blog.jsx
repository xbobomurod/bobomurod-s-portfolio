import { motion, AnimatePresence } from 'framer-motion'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Blog() {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)
	const [selectedPost, setSelectedPost] = useState(null)

	const fetchPosts = async () => {
		const { data, error } = await supabase
			.from('posts')
			.select('*')
			.order('id', { ascending: false })

		if (error) console.error('Error fetching posts:', error)
		else setPosts(data)
		setLoading(false)
	}

	useEffect(() => {
		fetchPosts()
	}, [])

	// 10 ta so'zdan keyin qisqartiruvchi funksiya
	const truncateText = (text, wordLimit = 10) => {
		if (!text) return ''
		const words = text.split(' ')
		return words.length > wordLimit
			? words.slice(0, wordLimit).join(' ') + '...'
			: text
	}

	return (
		<div className='min-h-screen bg-[#0a0e27] text-white p-6 pt-20'>
			<h1 className='text-3xl font-bold mb-8 text-center text-green-400'>
				Blog Posts
			</h1>

			{loading ? (
				<p className='text-center text-gray-400'>Loading...</p>
			) : posts.length === 0 ? (
				<p className='text-center text-gray-400'>Hozircha post yo‘q!</p>
			) : (
				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'>
					{posts.map(post => (
						<motion.div
							key={post.id}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4 }}
							onClick={() => setSelectedPost(post)}
							className='bg-white/10 p-5 rounded-2xl border border-white/10 shadow-lg hover:shadow-green-400/20 transition-all cursor-pointer hover:scale-[1.02]'
						>
							{post.image_url && (
								<img
									src={post.image_url}
									alt={post.title}
									className='rounded-lg w-full h-40 object-cover mb-3 border border-white/10'
								/>
							)}
							<h2 className='text-xl font-semibold text-green-400 mb-2'>
								{post.title}
							</h2>
							<p className='text-gray-300 leading-relaxed text-sm'>
								{truncateText(post.content, 10)}
							</p>
							<p className='text-xs text-gray-500 mt-3 text-right'>
								{new Date(post.created_at).toLocaleString()}
							</p>
						</motion.div>
					))}
				</div>
			)}

			{/* Modal */}
			<AnimatePresence>
				{selectedPost && (
					<motion.div
						className='fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setSelectedPost(null)}
					>
						<motion.div
							className='bg-[#101536] rounded-2xl p-6 max-w-lg w-full relative text-white shadow-xl border border-white/10'
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							onClick={e => e.stopPropagation()}
						>
							<button
								className='absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold'
								onClick={() => setSelectedPost(null)}
							>
								×
							</button>
							{selectedPost.image_url && (
								<img
									src={selectedPost.image_url}
									alt={selectedPost.title}
									className='rounded-lg w-full h-60 object-cover mb-4'
								/>
							)}
							<h2 className='text-2xl font-semibold text-green-400 mb-3'>
								{selectedPost.title}
							</h2>
							<p className='text-gray-200 leading-relaxed whitespace-pre-wrap'>
								{selectedPost.content}
							</p>
							<p className='text-xs text-gray-500 mt-4 text-right'>
								{new Date(selectedPost.created_at).toLocaleString()}
							</p>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
