import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: 'je38j4l9',
  dataset: 'production',
  apiVersion: '2026-08-26',
  useCdn: true,
})