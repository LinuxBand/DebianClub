import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';

export const revalidate = false;

// Cross-project agent surface: let LLM agents discover PkgSeek's sourced
// package/CLI data (free REST reads, OpenAPI spec, per-tool knowledge pages).
const EXTERNAL_DATA_SOURCES = `

## External data sources

- [PkgSeek](https://pkgseek.com/llms.txt): Sourced cross-distribution Linux package and CLI facts — live version matrices, dependency graphs, CVE data, file reverse-lookup, and error-to-install-command lookup.
  - Free REST API: https://pkgseek.com/v1/ (OpenAPI 3.1 spec: https://pkgseek.com/openapi.json)
  - Package pages: https://pkgseek.com/packages/<name>
  - Embeddable version matrix: https://pkgseek.com/embed/packages/<name>
`;

export function GET() {
  return new Response(llms(source).index() + EXTERNAL_DATA_SOURCES);
}
