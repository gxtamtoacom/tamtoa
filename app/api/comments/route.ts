import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { title, content, category } = await request.json()
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const post = await prisma.post.create({
    data: { title, slug, content, category }
  })

  return NextResponse.json(post)
}