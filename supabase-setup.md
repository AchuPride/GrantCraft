# GrantCraft AI Supabase Setup

This document outlines the necessary SQL statements to set up your Supabase database schema, including tables, relationships, Row-Level Security (RLS) policies, and database functions.

Run these commands in the Supabase SQL Editor for your project.

## 1. Enable UUID Extension

First, ensure the `uuid-ossp` extension is enabled.

```sql
create extension if not exists "uuid-ossp" with schema "extensions";
```

## 2. Table Creation

### Comments Table
This table will store comments on proposals for real-time collaboration.

```sql
create table public.comments (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now() not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  proposal_id uuid references public.proposals(id) on delete cascade not null,
  content text not null,
  user_full_name text, -- To store user's name at time of comment
  user_avatar_url text -- To store user's avatar at time of comment
);

-- Indexes
create index on public.comments (proposal_id);
create index on public.comments (user_id);
```

## 3. Database Functions & Triggers

### `update_last_modified_column` Function
This trigger function automatically updates the `last_modified` timestamp on any table it's applied to.

```sql
create or replace function public.update_last_modified_column()
returns trigger as $$
begin
  new.last_modified = now();
  return new;
end;
$$ language 'plpgsql';
```

### Trigger for `proposals` table
Apply the trigger to the `proposals` table. This will fire whenever a row is updated.

```sql
create trigger handle_updated_at before update on public.proposals
  for each row execute procedure public.update_last_modified_column();
```

## 4. Row-Level Security (RLS)

Enable RLS on all tables and apply policies. This is crucial for security.

### Proposals Table RLS

```sql
-- Enable RLS
alter table public.proposals enable row level security;

-- Policy: Users can see their own proposals.
create policy "Users can view their own proposals."
  on public.proposals for select
  using ( auth.uid() = user_id );

-- Policy: Users can insert their own proposals.
create policy "Users can create their own proposals."
  on public.proposals for insert
  with check ( auth.uid() = user_id );

-- Policy: Users can update their own proposals.
create policy "Users can update their own proposals."
  on public.proposals for update
  using ( auth.uid() = user_id );
```

### Grants Table RLS
Grants should be public to all authenticated users.

```sql
-- Enable RLS
alter table public.grants enable row level security;

-- Policy: Authenticated users can view grants.
create policy "Authenticated users can view grants."
  on public.grants for select
  using ( auth.role() = 'authenticated' );
```

### Comments Table RLS

```sql
-- Enable RLS
alter table public.comments enable row level security;

-- Policy: Users can view comments on proposals they have access to.
create policy "Users can view comments on their proposals."
  on public.comments for select
  using (
    exists (
      select 1
      from public.proposals
      where proposals.id = comments.proposal_id and proposals.user_id = auth.uid()
    )
  );

-- Policy: Users can insert comments.
create policy "Users can create comments."
  on public.comments for insert
  with check ( auth.uid() = user_id );
  
-- Policy: Users can only update their own comments.
create policy "Users can update their own comments."
  on public.comments for update
  using ( auth.uid() = user_id );

-- Policy: Users can only delete their own comments.
create policy "Users can delete their own comments."
  on public.comments for delete
  using ( auth.uid() = user_id );
```
