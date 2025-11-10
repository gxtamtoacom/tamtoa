import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ select: { slug: true } })
  return posts.map(p => ({ slug: p.slug }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { comments: { orderBy: { createdAt: 'desc' } } }
  })

  if (!post) notFound()

  return (
    <article className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 mb-8">
        {post.category} • {new Date(post.createdAt).toLocaleString('vi-VN')}
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} className="prose max-w-none" />
    </article>
  )
}