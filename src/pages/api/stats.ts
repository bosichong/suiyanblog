import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from '@/lib/supabase'

// GET /api/stats?slug=hello-world
// POST /api/stats
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { slug } = req.query
    
    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Slug required' })
    }

    const { data, error } = await supabaseAdmin
      .from('article_stats')
      .select('view_count, like_count')
      .eq('slug', slug)
      .single()

    if (error && error.code !== 'PGRST116') {
      return res.status(500).json({ error: error.message })
    }

    return res.json({
      views: data?.view_count || 0,
      likes: data?.like_count || 0
    })
  }

  if (req.method === 'POST') {
    const { slug } = req.body
    
    if (!slug) {
      return res.status(400).json({ error: 'Slug required' })
    }

    try {
      // 尝试先检查记录是否存在
      const { data: existingData } = await supabaseAdmin
        .from('article_stats')
        .select('view_count')
        .eq('slug', slug)
        .maybeSingle()

      if (existingData) {
        // 记录存在，更新阅读量
        const { error: updateError } = await supabaseAdmin
          .from('article_stats')
          .update({ 
            view_count: existingData.view_count + 1,
            updated_at: new Date().toISOString()
          })
          .eq('slug', slug)

        if (updateError) {
          console.error('Update error:', updateError)
          return res.status(500).json({ error: updateError.message })
        }
      } else {
        // 记录不存在，插入新记录
        const { error: insertError } = await supabaseAdmin
          .from('article_stats')
          .insert({ 
            slug, 
            view_count: 1,
            like_count: 0
          })

        if (insertError) {
          console.error('Insert error:', insertError)
          return res.status(500).json({ error: insertError.message })
        }
      }

      return res.json({ success: true })
    } catch (error) {
      console.error('Unexpected error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).json({ error: 'Method not allowed' })
}