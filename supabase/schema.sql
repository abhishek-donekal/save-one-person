-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- SUCCESS STORIES
create table if not exists success_stories (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  patient_name text not null,
  story_text text not null,
  outcome text,
  image_url text,
  video_url text,
  featured boolean default false,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  seo_title text,
  seo_description text
);

-- URGENT REQUESTS
create table if not exists urgent_requests (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  patient_name text not null,
  medical_condition text not null,
  story_text text not null,
  donation_goal numeric(10,2),
  donation_raised numeric(10,2) default 0,
  image_url text,
  status text default 'open' check (status in ('open', 'closed', 'fulfilled')),
  urgent boolean default false,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- BLOG POSTS
create table if not exists blog_posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  featured_image_url text,
  author text default 'Lauren Finkelstein',
  category text,
  tags text[] default '{}',
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  seo_title text,
  seo_description text
);

-- MEDIA ENTRIES
create table if not exists media_entries (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  outlet_name text not null,
  media_type text not null check (media_type in ('article','interview','podcast','video','tv')),
  url text,
  thumbnail_url text,
  published_date date,
  featured boolean default false,
  created_at timestamptz default now()
);

-- PARTNERS
create table if not exists partners (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  description text,
  logo_url text,
  website_url text,
  category text,
  featured boolean default false,
  created_at timestamptz default now()
);

-- EVENTS
create table if not exists events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  event_date timestamptz,
  location text,
  image_url text,
  registration_url text,
  published boolean default false,
  created_at timestamptz default now()
);

-- RLS POLICIES
alter table success_stories enable row level security;
alter table urgent_requests enable row level security;
alter table blog_posts enable row level security;
alter table media_entries enable row level security;
alter table partners enable row level security;
alter table events enable row level security;

-- Public read for published content
create policy "Public read published stories" on success_stories for select using (published = true);
create policy "Public read published requests" on urgent_requests for select using (published = true);
create policy "Public read published blogs" on blog_posts for select using (published = true);
create policy "Public read media" on media_entries for select using (true);
create policy "Public read partners" on partners for select using (true);
create policy "Public read events" on events for select using (published = true);

-- Authenticated users (admins) can do everything
create policy "Admin all stories" on success_stories for all using (auth.role() = 'authenticated');
create policy "Admin all requests" on urgent_requests for all using (auth.role() = 'authenticated');
create policy "Admin all blogs" on blog_posts for all using (auth.role() = 'authenticated');
create policy "Admin all media" on media_entries for all using (auth.role() = 'authenticated');
create policy "Admin all partners" on partners for all using (auth.role() = 'authenticated');
create policy "Admin all events" on events for all using (auth.role() = 'authenticated');

-- Updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_success_stories_updated_at
  before update on success_stories
  for each row execute function update_updated_at_column();

create trigger update_urgent_requests_updated_at
  before update on urgent_requests
  for each row execute function update_updated_at_column();

create trigger update_blog_posts_updated_at
  before update on blog_posts
  for each row execute function update_updated_at_column();
