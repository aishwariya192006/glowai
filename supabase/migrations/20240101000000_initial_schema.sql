-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Salons Table
create table public.salons (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  address text not null,
  city text not null,
  area text not null,
  phone text,
  email text,
  website text,
  logo_url text,
  gallery_urls text[] default '{}',
  rating numeric(3, 2) default 0.0,
  review_count integer default 0,
  price_range text default 'moderate' check (price_range in ('budget', 'moderate', 'premium')),
  is_women_owned boolean default false,
  is_verified boolean default false,
  trust_score integer default 0,
  features text[] default '{}',
  opening_time time not null,
  closing_time time not null,
  place_id text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services Table
create table public.services (
  id uuid default uuid_generate_v4() primary key,
  salon_id uuid references public.salons(id) on delete cascade not null,
  name text not null,
  description text,
  category text not null,
  duration_minutes integer not null,
  price numeric(10, 2) not null,
  original_price numeric(10, 2),
  is_student_deal boolean default false,
  is_popular boolean default false,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Users Table
create table public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  name text not null,
  phone text,
  avatar_url text,
  role text default 'customer' check (role in ('customer', 'salon_owner', 'admin')),
  glow_score integer default 0,
  hair_score integer default 0,
  skin_score integer default 0,
  confidence_score integer default 0,
  beauty_concerns text[] default '{}',
  skin_type text,
  hair_type text,
  preferred_styles text[] default '{}',
  is_student boolean default false,
  location text,
  college text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bookings Table
create table public.bookings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  salon_id uuid references public.salons(id) on delete cascade not null,
  service_id uuid references public.services(id) on delete set null not null,
  booking_date date not null,
  booking_time time not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  total_price numeric(10, 2),
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Reviews Table
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  salon_id uuid references public.salons(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  ai_summary text,
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, salon_id)
);

-- Categories Table
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  icon text,
  description text,
  sort_order integer default 0
);

-- Row Level Security (RLS)

alter table public.salons enable row level security;
alter table public.services enable row level security;
alter table public.users enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;
alter table public.categories enable row level security;

-- Policies
create policy "Salons are viewable by everyone" on public.salons for select using (true);
create policy "Services are viewable by everyone" on public.services for select using (true);
create policy "Categories are viewable by everyone" on public.categories for select using (true);
create policy "Reviews are viewable by everyone" on public.reviews for select using (true);

create policy "Users can view their own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update their own profile" on public.users for update using (auth.uid() = id);

create policy "Users can view their own bookings" on public.bookings for select using (auth.uid() = user_id);
create policy "Users can create their own bookings" on public.bookings for insert with check (auth.uid() = user_id);
create policy "Users can update their own bookings" on public.bookings for update using (auth.uid() = user_id);

create policy "Users can insert their own reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "Users can update their own reviews" on public.reviews for update using (auth.uid() = user_id);

-- Updated_at triggers
create or replace function public.set_current_timestamp_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

create trigger set_salons_updated_at before update on public.salons for each row execute procedure public.set_current_timestamp_updated_at();
create trigger set_users_updated_at before update on public.users for each row execute procedure public.set_current_timestamp_updated_at();
create trigger set_bookings_updated_at before update on public.bookings for each row execute procedure public.set_current_timestamp_updated_at();
