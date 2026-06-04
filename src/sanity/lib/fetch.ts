import { client } from './client'

type FetchOptions = {
  revalidate?: number | false
  tags?: string[]
}

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  { revalidate = 60, tags = [] }: FetchOptions = {}
): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: tags.length ? false : revalidate,
        tags,
      },
    })
  } catch (err) {
    console.error('[sanityFetch] query failed:', err)
    return null
  }
}
