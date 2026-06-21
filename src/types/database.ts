export interface SuccessStory {
  id: string
  title: string
  slug: string
  patient_name: string
  story_text: string
  outcome: string
  image_url: string | null
  video_url: string | null
  featured: boolean
  published: boolean
  created_at: string
  updated_at: string
  seo_title: string | null
  seo_description: string | null
}

export interface UrgentRequest {
  id: string
  title: string
  slug: string
  patient_name: string
  medical_condition: string
  story_text: string
  donation_goal: number
  donation_raised: number
  image_url: string | null
  status: 'open' | 'closed' | 'fulfilled'
  urgent: boolean
  published: boolean
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  featured_image_url: string | null
  author: string
  category: string | null
  tags: string[]
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  seo_title: string | null
  seo_description: string | null
}

export interface MediaEntry {
  id: string
  title: string
  outlet_name: string
  media_type: 'article' | 'interview' | 'podcast' | 'video' | 'tv'
  url: string
  thumbnail_url: string | null
  published_date: string | null
  featured: boolean
  created_at: string
}

export interface Partner {
  id: string
  name: string
  slug: string
  description: string | null
  logo_url: string | null
  website_url: string | null
  category: string | null
  featured: boolean
  created_at: string
}

export interface OutreachProgram {
  id: string
  title: string
  description: string | null
  image_url: string | null
  active: boolean
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string | null
  event_date: string
  location: string | null
  image_url: string | null
  registration_url: string | null
  created_at: string
}
