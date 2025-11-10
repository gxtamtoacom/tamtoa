'use client'
import { useState } from 'react'

export default function Admin() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Thời sự')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, category })
    })
    if (res.ok) {
      alert('Đăng bài thành công!')
      setTitle('')
      setContent('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">ĐĂNG BÀI MỚI</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Tiêu đề bài viết"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg text-xl"
          required
        />
        <textarea
          placeholder="Nội dung bài viết (có thể dùng HTML)"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={15}
          className="w-full p-3 border rounded-lg"
          required
        />
        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 border rounded-lg">
          <option>Thời sự</option>
          <option>Giải trí</option>
          <option>Thể thao</option>
          <option>Công nghệ</option>
        </select>
        <button type="submit" className="bg-red-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-red-700">
          ĐĂNG BÀI NGAY
        </button>
      </form>
    </div>
  )
}