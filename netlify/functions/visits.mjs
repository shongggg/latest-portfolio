// Global visit counter for your portfolio (runs on Netlify, no database to set up).
//   GET /api/visits         -> { count }          (just reads)
//   GET /api/visits?hit=1   -> { count }          (adds 1, then returns the new total)
import { getStore } from '@netlify/blobs'

export default async (req) => {
  const store = getStore('portfolio')
  const hit = new URL(req.url).searchParams.get('hit') === '1'

  let count = Number(await store.get('visits')) || 0
  if (hit) {
    count += 1
    await store.set('visits', String(count))
  }

  return Response.json({ count }, { headers: { 'cache-control': 'no-store' } })
}

export const config = { path: '/api/visits' }
