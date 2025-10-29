import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Blog() {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true)

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

	return (
		<div className='min-h-screen bg-[#0a0e27] text-white p-6 mt-15'>
			<h1 className='text-3xl font-bold mb-6 text-center text-green-400'>
				Blog Posts
			</h1>

			{loading ? (
				<p className='text-center text-gray-400'>Loading...</p>
			) : posts.length === 0 ? (
				<p className='text-center text-gray-400'>Hozircha post yo‘q!</p>
			) : (
				<div className='space-y-6 max-w-2xl mx-auto'>
					{posts.map(post => (
						<div
							key={post.id}
							className='bg-white/10 p-5 rounded-2xl border border-white/10 shadow-lg hover:shadow-green-500/20 transition'
						>
							<h2 className='text-xl font-semibold text-green-400 mb-2'>
								{post.title}
							</h2>
							<p className='text-gray-300 leading-relaxed whitespace-pre-wrap'>
								{post.content}
							</p>
							<p className='text-xs text-gray-500 mt-3 text-right'>
								{new Date(post.created_at).toLocaleString()}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
