export default async function handler(req, res) {
  const { id } = req.query;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  const r = await fetch(`${supabaseUrl}/rest/v1/page_tokens?id=eq.${id}&select=params,template`, {
    headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
  });
  const rows = await r.json();
  if (!rows || !rows.length) return res.status(404).send('Link not found');

  const { params, template } = rows[0];
  const base = template === 'pwash' ? 'https://aquaforce.vercel.app' : 'https://aquaforce.vercel.app';
  const qs = new URLSearchParams(params).toString();
  res.redirect(302, `${base}?${qs}`);
}
