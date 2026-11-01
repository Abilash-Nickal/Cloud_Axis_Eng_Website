import { createClient } from '@supabase/supabase-js';
import { latestNewsItems, detailedProjects, servicesOffer } from '../data/cloudAxisData';
import { clientTestimonials } from '../data/industrialData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Determine if user has connected their real Supabase project
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================
// 1. NEWS & ARTICLES HELPERS
// ==========================================
export async function getNewsList(includeDrafts = false) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: latestNewsItems, isLive: false, error: null };
  }

  try {
    let query = supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (!includeDrafts) {
      query = query.eq('published', true);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) {
      return { data: latestNewsItems, isLive: true, error: null };
    }

    return { data, isLive: true, error: null };
  } catch (err) {
    console.warn('Supabase getNewsList error, falling back:', err);
    return { data: latestNewsItems, isLive: false, error: err.message };
  }
}

export async function upsertNewsItem(item) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured yet.');
  }

  const payload = {
    title: item.title,
    slug: item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    category: item.category || 'Company Life',
    excerpt: item.excerpt || '',
    content: item.content || '',
    image: item.image || item.cover_image_url || '',
    cover_image_url: item.image || item.cover_image_url || '',
    author: item.author || 'CloudAxis Engineering',
    read_time: item.read_time || item.readTime || '3 min read',
    date: item.date || new Date().toISOString().split('T')[0],
    published: item.published !== undefined ? item.published : true,
    tags: Array.isArray(item.tags) ? item.tags : (item.tags ? item.tags.split(',').map(s => s.trim()) : [])
  };

  if (item.id && typeof item.id === 'string' && item.id.includes('-')) {
    payload.id = item.id;
  }

  const { data, error } = await supabase
    .from('news')
    .upsert(payload)
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function deleteNewsItem(id) {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase is not configured.');
  const { error } = await supabase.from('news').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// ==========================================
// 2. PROJECTS & CASE STUDIES HELPERS
// ==========================================
export async function getProjectsList(includeDrafts = false) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: detailedProjects, isLive: false, error: null };
  }

  try {
    let query = supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (!includeDrafts) {
      query = query.eq('published', true);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) {
      return { data: detailedProjects, isLive: true, error: null };
    }

    return { data, isLive: true, error: null };
  } catch (err) {
    console.warn('Supabase getProjectsList error, falling back:', err);
    return { data: detailedProjects, isLive: false, error: err.message };
  }
}

export async function upsertProjectItem(item) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured yet.');
  }

  const payload = {
    title: item.title,
    slug: item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    industry: item.industry || item.sector || 'Industrial Automation',
    category: item.category || 'Factory Automation',
    description: item.description || item.objective || '',
    objective: item.objective || item.description || '',
    image: item.image || item.cover_image_url || '',
    cover_image_url: item.image || item.cover_image_url || '',
    metric: item.metric || '',
    duration: item.duration || '4 Weeks',
    status: item.status || 'Completed',
    published: item.published !== undefined ? item.published : true,
    tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack : (item.tech_stack ? item.tech_stack.split(',').map(s => s.trim()) : (Array.isArray(item.tags) ? item.tags : [])),
    tags: Array.isArray(item.tags) ? item.tags : (item.tags ? item.tags.split(',').map(s => s.trim()) : []),
    deliverables: Array.isArray(item.deliverables) ? item.deliverables : (item.deliverables ? item.deliverables.split('\n').filter(Boolean) : [])
  };

  if (item.id && typeof item.id === 'string' && item.id.includes('-')) {
    payload.id = item.id;
  }

  const { data, error } = await supabase
    .from('projects')
    .upsert(payload)
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function deleteProjectItem(id) {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase is not configured.');
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// ==========================================
// 3. SERVICES & SOLUTIONS HELPERS
// ==========================================
export async function getServicesList() {
  if (!isSupabaseConfigured || !supabase) {
    return { data: servicesOffer, isLive: false, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) {
      return { data: servicesOffer, isLive: true, error: null };
    }

    return { data, isLive: true, error: null };
  } catch (err) {
    console.warn('Supabase getServicesList error, falling back:', err);
    return { data: servicesOffer, isLive: false, error: err.message };
  }
}

export async function upsertServiceItem(item) {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase is not configured yet.');

  const payload = {
    title: item.title,
    short_desc: item.short_desc || item.description || '',
    detailed_desc: item.detailed_desc || item.short_desc || '',
    icon_name: item.icon_name || item.icon || 'Cpu',
    image_url: item.image_url || item.image || '',
    featured: Boolean(item.featured),
    order_index: Number(item.order_index) || 0,
    deliverables: Array.isArray(item.deliverables) ? item.deliverables : (item.deliverables ? item.deliverables.split('\n').filter(Boolean) : [])
  };

  if (item.id && typeof item.id === 'string' && item.id.includes('-')) {
    payload.id = item.id;
  }

  const { data, error } = await supabase
    .from('services')
    .upsert(payload)
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function deleteServiceItem(id) {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase is not configured.');
  const { error } = await supabase.from('services').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// ==========================================
// 4. CLIENT TESTIMONIALS HELPERS
// ==========================================
export async function getTestimonialsList() {
  if (!isSupabaseConfigured || !supabase) {
    return { data: clientTestimonials, isLive: false, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      return { data: clientTestimonials, isLive: true, error: null };
    }

    return { data, isLive: true, error: null };
  } catch (err) {
    console.warn('Supabase getTestimonialsList error, falling back:', err);
    return { data: clientTestimonials, isLive: false, error: err.message };
  }
}

export async function upsertTestimonialItem(item) {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase is not configured yet.');

  const payload = {
    quote: item.quote,
    client_name: item.client_name || item.author || 'Anonymous Client',
    designation: item.designation || item.role || '',
    company: item.company || '',
    rating: Number(item.rating) || 5,
    tag: item.tag || 'Turnkey Automation',
    avatar_url: item.avatar_url || item.avatar || ''
  };

  if (item.id && typeof item.id === 'string' && item.id.includes('-')) {
    payload.id = item.id;
  }

  const { data, error } = await supabase
    .from('testimonials')
    .upsert(payload)
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function deleteTestimonialItem(id) {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase is not configured.');
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// ==========================================
// 5. INQUIRIES & RFP INBOX HELPERS
// ==========================================
export async function submitInquiry(inquiry) {
  if (!isSupabaseConfigured || !supabase) {
    console.log('Demo mode: inquiry received locally', inquiry);
    return { id: `mock-${Date.now()}`, ...inquiry };
  }

  const payload = {
    sender_name: inquiry.sender_name || inquiry.fullName || 'Prospective Client',
    email: inquiry.email || inquiry.workEmail || '',
    phone: inquiry.phone || '',
    organization: inquiry.organization || inquiry.company || '',
    subject: inquiry.subject || inquiry.serviceRequired || inquiry.service || 'Engineering RFP',
    service: inquiry.service || inquiry.serviceRequired || '',
    message: inquiry.message || inquiry.projectScope || inquiry.scope || '',
    status: 'new'
  };

  const { data, error } = await supabase
    .from('inquiries')
    .insert([payload])
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function getInquiriesList() {
  if (!isSupabaseConfigured || !supabase) {
    return { data: [], isLive: false, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data: data || [], isLive: true, error: null };
  } catch (err) {
    console.warn('Supabase getInquiriesList error:', err);
    return { data: [], isLive: false, error: err.message };
  }
}

export async function updateInquiryStatus(id, status) {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase
    .from('inquiries')
    .update({ status })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function deleteInquiryItem(id) {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase is not configured.');
  const { error } = await supabase.from('inquiries').delete().eq('id', id);
  if (error) throw error;
  return true;
}

// ==========================================
// 6. IMAGE / MEDIA UPLOAD HELPER
// ==========================================
export async function uploadMediaImage(file, bucket = 'media') {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured yet.');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl;
}
