import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Tạo 50 bài mẫu
    for (let i = 1; i <= 50; i++) {
      await prisma.post.upsert({
        where: { slug: `tin-tuc-moi-nhat-${i}` },
        update: {},
        create: {
          title: `Tin nóng ${i}: TP.HCM mưa lớn, ngập đến đầu gối`,
          slug: `tin-tuc-moi-nhat-${i}`,
          content: `<p>Nội dung chi tiết bài viết số ${i}...</p>`,
          category: i % 2 === 0 ? "Thời sự" : "Giải trí"
        }
      })
    }
    return NextResponse.json({ message: "Khởi tạo thành công! 50 bài tin tức đã sẵn sàng!" })
  } catch (error) {
    return NextResponse.json({ error: "Lỗi rồi bro" }, { status: 500 })
  }
}