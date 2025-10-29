import { Edit3, Save, Trash2, ImagePlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AdminBlog() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [editingPost, setEditingPost] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: false })

    if (error) console.error('Error fetching posts:', error)
    else setPosts(data)
  }

  const uploadImage = async file => {
    if (!file) return null

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `blog/${fileName}`

    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (error) {
      console.error('Upload error:', error)
      alert('Rasm yuklanmadi: ' + error.message)
      return null
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath)
    return data.publicUrl
  }

  const handleAddPost = async () => {
    if (!title || !content) return alert('Title va content kerak!')
    setLoading(true)

    let imageUrl = null
    if (imageFile) imageUrl = await uploadImage(imageFile)

    const { error } = await supabase
      .from('posts')
      .insert([{ title, content, image_url: imageUrl }])

    setLoading(false)
    if (error) return alert('Xato: ' + error.message)

    setTitle('')
    setContent('')
    setImageFile(null)
    fetchPosts()
  }

  const handleDelete = async id => {
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) return alert('O‘chirilmadi: ' + error.message)
    fetchPosts()
  }

  const handleEdit = post => {
    setEditingPost(post.id)
    setTitle(post.title)
    setContent(post.content)
  }

  const handleUpdate = async () => {
    if (!title || !content) return alert('Title va content kerak!')
    setLoading(true)

    let imageUrl = null
    if (imageFile) imageUrl = await uploadImage(imageFile)

    const updateData = { title, content }
    if (imageUrl) updateData.image_url = imageUrl

    const { error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', editingPost)

    setLoading(false)
    if (error) return alert('Yangilashda xato: ' + error.message)

    setEditingPost(null)
    setTitle('')
    setContent('')
    setImageFile(null)
    fetchPosts()
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className='min-h-screen bg-[#0a0e27] text-white p-6'>
      <h1 className='text-3xl font-bold mb-6 text-center text-cyan-400'>
        Admin Blog Panel
      </h1>

      {/* Form */}
      <div className='max-w-2xl mx-auto bg-white/10 p-5 rounded-2xl border border-white/10 mb-10'>
        <input
          type='text'
          placeholder='Post sarlavhasi...'
          value={title}
          onChange={e => setTitle(e.target.value)}
          className='w-full p-3 mb-3 rounded bg-white/10 text-white border border-white/20 focus:border-green-400 outline-none'
        />
        <textarea
          placeholder='Post matni...'
          value={content}
          onChange={e => setContent(e.target.value)}
          rows='5'
          className='w-full p-3 mb-3 rounded bg-white/10 text-white border border-white/20 focus:border-green-400 outline-none resize-none'
        ></textarea>

        {/* Image upload */}
        <label className='flex items-center gap-3 cursor-pointer text-gray-300 hover:text-white mb-4'>
          <ImagePlus size={18} />
          <span>Rasm yuklash (ixtiyoriy)</span>
          <input
            type='file'
            accept='image/*'
            onChange={e => setImageFile(e.target.files[0])}
            className='hidden'
          />
          {imageFile && (
            <span className='text-sm text-green-400'>
              ✅ {imageFile.name}
            </span>
          )}
        </label>

        {editingPost ? (
          <button
            onClick={handleUpdate}
            disabled={loading}
            className='bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white transition disabled:opacity-50'
          >
            <Save size={16} className='inline-block mr-2' />
            Yangilash
          </button>
        ) : (
          <button
            onClick={handleAddPost}
            disabled={loading}
            className='bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white transition disabled:opacity-50'
          >
            Qo‘shish
          </button>
        )}
      </div>

      {/* Posts */}
      <div className='space-y-4 max-w-2xl mx-auto'>
        {posts.map(post => (
          <div
            key={post.id}
            className='bg-white/10 p-4 rounded-2xl border border-white/10 shadow-lg flex flex-col gap-3'
          >
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className='rounded-lg max-h-64 object-cover border border-white/10'
              />
            )}
            <div>
              <h2 className='text-lg font-semibold text-green-400'>
                {post.title}
              </h2>
              <p className='text-gray-300 text-sm'>{post.content}</p>
            </div>
            <div className='flex gap-3'>
              <button
                onClick={() => handleEdit(post)}
                className='p-2 bg-blue-500/30 hover:bg-blue-500/50 rounded-lg text-blue-300'
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className='p-2 bg-red-500/30 hover:bg-red-500/50 rounded-lg text-red-300'
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
