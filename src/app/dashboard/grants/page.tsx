import { createClient } from '@/lib/supabase/server';
import { GrantClientPage } from '@/components/grants/grant-client-page';

export default async function GrantsPage() {
    const supabase = createClient();
    const { data: grants } = await supabase.from('grants').select('*');

    return <GrantClientPage initialGrants={grants || []} />
}
