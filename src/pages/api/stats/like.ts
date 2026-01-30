import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '@/lib/supabase'

// POST /api/stats/like
// GET /api/stats/like?slug=hello-world&fingerprint=xxx
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { slug, fingerprint } = req.body
    
    if (!slug || !fingerprint) {
      return res.status(400).json({ error: 'Slug and fingerprint required' })
    }

    const { data, error } = await supabaseAdmin.rpc('toggle_like', {
      article_slug: slug,
      user_fingerprint: fingerprint
    })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.json({
      liked: data.liked,
      likes: data.current_likes
    })
  }

  if (req.method === 'GET') {
    const { slug, fingerprint } = req.query
    
    if (!slug || !fingerprint || typeof slug !== 'string' || typeof fingerprint !== 'string') {
      return res.status(400).json({ error: 'Slug and fingerprint required' })
    }

    // 并行查询：当前用户是否喜欢 + 文章总喜欢数
    const [userLikeData, statsData] = await Promise.all([
      supabaseAdmin
        .from('user_likes')
        .select('id')
        .eq('slug', slug)
        .eq('fingerprint', fingerprint)
        .maybeSingle(),
      supabaseAdmin
        .from('article_stats')
        .select('like_count')
        .eq('slug', slug)
        .maybeSingle()
    ])

    return res.json({
      liked: !!userLikeData.data,
      likes: statsData.data?.like_count || 0
    })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).json({ error: 'Method not allowed' })
}