-- ==============================================================================
-- CloudAxis Engineering - Complete Supabase Database Schema & Security
-- Paste this script into your Supabase Dashboard -> SQL Editor and click RUN
-- ==============================================================================

-- 1. Create the 'projects' table
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text,
  industry text default 'Industrial Automation',
  category text not null default 'Factory Automation',
  description text,
  objective text,
  tech_stack text[] default '{}',
  tags text[] default '{}',
  cover_image_url text,
  image text,
  gallery_urls text[] default '{}',
  metric text,
  duration text default '4 Weeks',
  status text default 'Completed', -- 'Completed', 'In Progress', 'Scheduled'
  published boolean default true,
  deliverables text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure projects columns exist if table was created in an earlier step
alter table public.projects add column if not exists slug text;
alter table public.projects add column if not exists industry text default 'Industrial Automation';
alter table public.projects add column if not exists description text;
alter table public.projects add column if not exists tech_stack text[] default '{}';
alter table public.projects add column if not exists cover_image_url text;
alter table public.projects add column if not exists gallery_urls text[] default '{}';
alter table public.projects add column if not exists status text default 'Completed';
alter table public.projects add column if not exists published boolean default true;
alter table public.projects add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());

-- 2. Create the 'news' table
create table if not exists public.news (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text,
  category text not null default 'Company Life',
  excerpt text,
  content text,
  cover_image_url text,
  image text,
  author text default 'CloudAxis Engineering',
  date text default to_char(now(), 'YYYY-MM-DD'),
  read_time text default '3 min read',
  tags text[] default '{}',
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure news columns exist if table was created in an earlier step
alter table public.news add column if not exists slug text;
alter table public.news add column if not exists cover_image_url text;
alter table public.news add column if not exists tags text[] default '{}';
alter table public.news add column if not exists published boolean default true;
alter table public.news add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());

-- 3. Create the 'services' table
create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  short_desc text,
  detailed_desc text,
  icon_name text default 'Cpu',
  image_url text,
  deliverables text[] default '{}',
  featured boolean default false,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create the 'testimonials' table
create table if not exists public.testimonials (
  id uuid default gen_random_uuid() primary key,
  quote text not null,
  client_name text not null,
  designation text,
  company text,
  rating integer default 5,
  avatar_url text,
  tag text default 'Plant Operations',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create the 'inquiries' table (Contact Form & RFP Submissions)
create table if not exists public.inquiries (
  id uuid default gen_random_uuid() primary key,
  sender_name text not null,
  email text not null,
  phone text,
  organization text,
  subject text,
  service text,
  message text,
  status text default 'new', -- 'new', 'contacted', 'closed'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.projects enable row level security;
alter table public.news enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.inquiries enable row level security;

-- Drop old policies to avoid duplicates
drop policy if exists "Public can read news" on public.news;
drop policy if exists "Authenticated admins can insert news" on public.news;
drop policy if exists "Authenticated admins can update news" on public.news;
drop policy if exists "Authenticated admins can delete news" on public.news;
drop policy if exists "Admins can all news" on public.news;

drop policy if exists "Public can read projects" on public.projects;
drop policy if exists "Authenticated admins can insert projects" on public.projects;
drop policy if exists "Authenticated admins can update projects" on public.projects;
drop policy if exists "Authenticated admins can delete projects" on public.projects;
drop policy if exists "Admins can all projects" on public.projects;

drop policy if exists "Public can read services" on public.services;
drop policy if exists "Admins can all services" on public.services;

drop policy if exists "Public can read testimonials" on public.testimonials;
drop policy if exists "Admins can all testimonials" on public.testimonials;

drop policy if exists "Public can insert inquiries" on public.inquiries;
drop policy if exists "Admins can all inquiries" on public.inquiries;

-- 1. Projects policies
create policy "Public can read projects"
  on public.projects for select
  using (published = true);

create policy "Admins can all projects"
  on public.projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 2. News policies
create policy "Public can read news"
  on public.news for select
  using (published = true);

create policy "Admins can all news"
  on public.news for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 3. Services policies
create policy "Public can read services"
  on public.services for select
  using (true);

create policy "Admins can all services"
  on public.services for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 4. Testimonials policies
create policy "Public can read testimonials"
  on public.testimonials for select
  using (true);

create policy "Admins can all testimonials"
  on public.testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 5. Inquiries policies (Visitors can send inquiries; only admins can view & edit)
create policy "Public can insert inquiries"
  on public.inquiries for insert
  with check (true);

create policy "Admins can all inquiries"
  on public.inquiries for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ==============================================================================
-- STORAGE BUCKET FOR MEDIA
-- ==============================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "Public can view media" on storage.objects;
drop policy if exists "Admins can upload media" on storage.objects;
drop policy if exists "Admins can delete media" on storage.objects;

create policy "Public can view media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Admins can upload media"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Admins can delete media"
  on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');

-- ==============================================================================
-- SEED DATA (Default Services, Testimonials, News, and Projects)
-- ==============================================================================

-- Seed Services
insert into public.services (title, short_desc, detailed_desc, icon_name, featured, order_index, deliverables)
values
(
  'Industrial Automation & PLC/SCADA',
  'Intelligent deterministic control architectures, high-performance HMI visualizations, and plant-wide SCADA integration.',
  'We architect, program, and commission high-availability PLC and SCADA/HMI distributed control systems. From high-speed discrete packaging lines to complex batch continuous processes, our architectures guarantee sub-millisecond execution and real-time visualization.',
  'Cpu',
  true,
  1,
  ARRAY['Structured IEC 61131-3 logic programming', 'High-performance ISA-101 compliant HMI screens', 'Redundant server SCADA historian setups', 'Profinet & Ethernet/IP networking']
),
(
  'Custom Electrical Control Panels',
  'Turnkey enclosure design with EPLAN Electric P8, precision wiring, thermal modeling, and multi-bay motor control centers.',
  'Our engineering panel shop builds custom electrical enclosures tailored for harsh industrial conditions. Built with meticulous wire routing, comprehensive thermal calculation, and laser-engraved terminal labeling.',
  'Zap',
  true,
  2,
  ARRAY['EPLAN Pro Panel 3D schematics', 'UL 508A / cUL listing & serialization', 'Point-to-Point FAT testing', 'Thermal load modeling & climate control']
),
(
  'Smart Manufacturing & IoT Solutions',
  'Edge telemetry, MQTT protocol gateways, real-time OEE dashboards, and predictive maintenance sensor integration.',
  'CloudAxis Engineering introduces non-invasive industrial IoT architectures allowing factory owners to stream real-time plant telemetry to mobile and web dashboards, preventing unplanned downtime.',
  'Boxes',
  true,
  3,
  ARRAY['Edge IoT telemetry hubs', 'Vibration & thermal anomaly sensors', 'Real-time OEE cloud dashboards', 'Automated maintenance alert pipelines']
)
on conflict do nothing;

-- Seed Testimonials
insert into public.testimonials (quote, client_name, designation, company, rating, tag, avatar_url)
values
(
  'CloudAxis re-architected our legacy bottling plant control panels in a 36-hour weekend window with zero production loss on Monday morning. Flawless engineering.',
  'Marcus Vance',
  'VP of Operations',
  'Apex Beverage Group',
  5,
  'Turnkey Automation',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
),
(
  'Their EPLAN panel schematics and UL 508A build quality set a new standard for our automotive tier-1 stamping facilities.',
  'Elena Rostova',
  'Director of Engineering',
  'Precision Auto Stamping Corp',
  5,
  'Control Panel Fabrication',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
),
(
  'The SCADA integration gave our executive leadership real-time visibility into line OEE across 4 facilities simultaneously.',
  'David Chen',
  'Plant Operations Lead',
  'SinoChem Global Materials',
  5,
  'SCADA Architecture',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
)
on conflict do nothing;

-- Seed News
insert into public.news (title, category, excerpt, content, image, date, author, read_time, published)
values 
(
  'CloudAxis Engineering Launches Next-Generation Industrial Automation Services',
  'Company Life',
  'Headquartered in Bingiriya, CloudAxis Engineering announces official operations dedicated to optimizing plant efficiency and modernizing manufacturing systems.',
  'CloudAxis Engineering has officially launched operations from its headquarters in Bingiriya, North Western Province. Combining advanced PLC/SCADA programming, precision EPLAN Electric P8 panel design, and SOLIDWORKS electro-mechanical engineering, the firm is dedicated to bridging the gap between mechanical execution and intelligent plant control.',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  '2026',
  'Engineering Board',
  '3 min read',
  true
),
(
  'Commissioning of Custom Multi-Axis VFD & Servo Control Enclosures',
  'Projects',
  'Delivering turnkey control panels with isolated 24VDC telemetry, integrated emergency stop loops, and dynamic motion profiling.',
  'Engineered using EPLAN Electric P8 and certified assembly practices, this multi-bay automation enclosure features synchronized servo drives, digital power metering, and remote edge telemetry designed for high-precision manufacturing lines.',
  'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80',
  '2026',
  'Controls Division',
  '3 min read',
  true
),
(
  'Smart Manufacturing & IoT Gateway Deployment for Factory Predictive Maintenance',
  'Smart Tech',
  'Deploying edge IoT telemetry to monitor machine vibration, motor current, and thermal anomalies in real time.',
  'CloudAxis Engineering introduces non-invasive industrial IoT architectures allowing factory owners to stream real-time plant telemetry to mobile and web dashboards, preventing unplanned downtime before critical component failures occur.',
  'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
  '2026',
  'IoT Solutions Team',
  '2 min read',
  true
)
on conflict do nothing;
