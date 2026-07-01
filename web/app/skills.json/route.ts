import registry from '../../../skills/registry.json';

export const dynamic = 'force-static';
export const revalidate = false;

export function GET() {
  return Response.json(registry, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
