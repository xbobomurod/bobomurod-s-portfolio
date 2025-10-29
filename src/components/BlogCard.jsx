export default function BlogCard({ post }) {
	return (
		<div className='bg-[#1b1e3b] rounded-xl p-4 border border-white/10 hover:border-green-400/50 transition'>
			<h2 className='text-xl font-semibold mb-2'>{post.title}</h2>
			<p className='text-gray-300 text-sm mb-4'>
				{post.content.slice(0, 120)}...
			</p>
			<div className='text-xs text-gray-400'>
				{new Date(post.created_at).toLocaleDateString()}
			</div>
		</div>
	)
}
