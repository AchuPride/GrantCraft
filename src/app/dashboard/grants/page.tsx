import { createClient } from '@/lib/supabase/server';
import { GrantClientPage } from '@/components/grants/grant-client-page';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function GrantsPage() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: grants } = await supabase.from('grants').select('*');

    return <GrantClientPage initialGrants={grants || []} />
}
