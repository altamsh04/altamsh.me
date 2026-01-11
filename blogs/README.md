# Blog Posts

This directory contains markdown-based blog posts and an `index.md` file with metadata for all blogs.

## Blog System Structure

The blog system uses two files for each blog post:
1. **`index.md`** - Contains metadata for all blog posts in YAML frontmatter (title, slug, date, summary, etc.)
2. **Individual `.md` files** - Contains the actual blog content (e.g., `why-rag-is-better.md`)

## index.md Format

The `index.md` file should contain YAML frontmatter with a `blogs` array:

```yaml
---
blogs:
  - title: "Why RAG is Better"
    slug: "why-rag-is-better"
    date: "2024-01-15"
    summary: "Retrieval-Augmented Generation (RAG) represents a significant leap forward in AI capabilities."
    category: "AI"
    tags:
      - "RAG"
      - "Machine Learning"
      - "LLM"
    featured_image: ""
  - title: "Another Blog Post"
    slug: "another-blog-post"
    date: "2024-01-20"
    summary: "Another interesting topic..."
    category: "Technology"
    tags:
      - "Web Development"
    featured_image: ""
---
```

### Metadata Fields

**Required fields:**
- `title`: The title of the blog post
- `slug`: URL-friendly identifier (must match the filename without `.md`)
- `date`: Publication date in YYYY-MM-DD format
- `summary`: Short description/excerpt of the blog post

**Optional fields:**
- `category`: Blog category
- `tags`: Array of tags (e.g., `["AI", "Machine Learning"]`)
- `featured_image`: URL to featured image

## Blog Post Markdown Files

Each blog post should be a markdown file (`.md`) with the filename matching the slug from `index.md`.

### File Naming

The filename must match the slug (e.g., `why-rag-is-better.md` for slug `why-rag-is-better`).

### Content Format

The markdown file should contain the blog content. You can include frontmatter if you want, but it's optional since metadata comes from `index.md`.

Example:

```markdown
## Understanding RAG

RAG combines the power of information retrieval with generative AI models...

## Key Advantages

### 1. **Up-to-Date Information**

Traditional language models are limited to their training data...
```

## How It Works

1. **`/blogs` page** - Reads `index.md` to get metadata for all blogs and displays them as cards
2. **`/blogs/[slug]` page** - Reads `index.md` for metadata and the corresponding `.md` file for content

## Adding a New Blog Post

1. Add a new entry to the `blogs` array in `index.md` with the blog metadata
2. Create a new `.md` file with the filename matching the slug
3. Write your blog content in markdown format

## URL Structure

- List all blogs: `/blogs`
- Individual blog post: `/blogs/[slug]`

Where `[slug]` is the slug defined in `index.md` and matches the filename.
