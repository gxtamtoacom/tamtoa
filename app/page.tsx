import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const revalidate = 10 // Cập nhật mỗi 10 giây

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20
  })

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-8">TIN TỨC 24H</h1>
      <div className="grid gap-6">
        {posts.map(post => (
          <Link href={`/post/${post.slug}`} key={post.id} className="block p-6 border rounded-lg hover:bg-gray-50">
            <h2 className="text-2xl font-bold text-blue-700">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...</p>
            <div className="mt-4 text-sm text-gray-500">
              {post.category} • {new Date(post.createdAt).toLocaleDateString('vi-VN')}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}