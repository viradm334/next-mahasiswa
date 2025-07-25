import client from 'prom-client';

const register = new client.Registry();
client.collectDefaultMetrics({ register });

export async function GET(req) {
  const metrics = await register.metrics();

  return new Response(metrics, {
    headers: { 'Content-Type': register.contentType },
  });
}