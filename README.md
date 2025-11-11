# API Documentation Pipeline

An automated pipeline for maintaining synchronized API documentation across multiple microservices. This system combines individual service OpenAPI specifications into a unified documentation site that stays current with API changes.

## Architecture

```
specs/                 # Individual service OpenAPI specs (YAML)
scripts/combine.js     # Merges all specs → build/openapi.{yaml,json}
scripts/validate.js    # Validates combined spec (operationId, descriptions)
build/                 # Generated unified OpenAPI spec
docs/index.html        # Redoc documentation site
.github/workflows/     # CI/CD automation
```

## Key Features

- **Automated Merging**: Combines multiple service specs into a single unified API specification
- **Quality Validation**: Ensures all endpoints have required documentation (operationId, descriptions)
- **Auto-Deployment**: Documentation updates automatically on spec changes
- **Living Documentation**: Docs stay synchronized with API changes through CI/CD

## Quick Start

```bash
pnpm install
pnpm run build      # Combines and validates specs
pnpm run serve      # Start local server
# Open http://localhost:4173/docs/
```

## Extending This Pipeline

This demo can be extended with:
- **Dynamic spec fetching** from service CI artifacts or endpoints
- **Spectral validation** for comprehensive linting and style rules
- **PR diff comments** to flag missing documentation on API changes
- **Example validation** to ensure request/response examples are present
- **Breaking change detection** to alert on backwards-incompatible changes


## Deployment

### GitHub Pages Setup

The repository includes automated deployment to GitHub Pages via `.github/workflows/deploy-docs-to-gh-pages.yml`.

**Configuration:**
1. Go to **Repository Settings → Pages**
2. Set **Source** to **"GitHub Actions"**
3. Push changes to trigger deployment

The workflow automatically:
- Combines and validates all service specs
- Generates unified OpenAPI documentation
- Deploys to GitHub Pages on every push to `main`

**Live URL:** `https://<username>.github.io/<repo>/`

### Local Development

```bash
pnpm run dev        # Build specs and start local server
# Visit http://localhost:4173/docs/
```

## CI/CD Workflows

- **`docs.yml`**: Validates specs on every push
- **`deploy-docs-to-gh-pages.yml`**: Builds and deploys documentation to GitHub Pages
