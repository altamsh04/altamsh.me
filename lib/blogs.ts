import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogMetadata {
  title: string
  slug: string
  date: string
  summary: string
  category?: string
  tags?: string[]
  featured_image?: string
}

export interface BlogPost extends BlogMetadata {
  content: string
}

const blogsDirectory = path.join(process.cwd(), "blogs")
const indexFilePath = path.join(blogsDirectory, "index.md")

// Read index.md to get all blog metadata
export function getAllBlogMetadata(): BlogMetadata[] {
  if (!fs.existsSync(indexFilePath)) {
    console.error("index.md not found in blogs directory")
    return []
  }

  try {
    const indexContent = fs.readFileSync(indexFilePath, "utf8")
    const { data } = matter(indexContent)
    
    // Validate structure
    if (!data.blogs || !Array.isArray(data.blogs)) {
      console.error("index.md must contain a 'blogs' array in frontmatter")
      return []
    }

    // Sort by date (newest first)
    return data.blogs.sort((a: BlogMetadata, b: BlogMetadata) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
  } catch (error) {
    console.error("Error reading index.md:", error)
    return []
  }
}

// Get all blog slugs from index.md
export function getAllBlogSlugs(): string[] {
  const blogs = getAllBlogMetadata()
  return blogs.map((blog) => blog.slug)
}

// Alias for consistency
export function getBlogSlugs(): string[] {
  return getAllBlogSlugs()
}

// Get blog post by slug (reads the actual .md file and gets metadata from index.md)
export function getBlogBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(blogsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { content } = matter(fileContents)

    // Get metadata from index.md
    const allMetadata = getAllBlogMetadata()
    const metadata = allMetadata.find((blog) => blog.slug === slug)

    if (!metadata) {
      console.error(`Blog metadata not found for slug: ${slug}`)
      return null
    }

    return {
      ...metadata,
      content,
    }
  } catch (error) {
    console.error(`Error reading blog ${slug}:`, error)
    return null
  }
}

// Get all blog posts with metadata (sorted by date, newest first)
export function getAllBlogs(): BlogPost[] {
  const slugs = getAllBlogSlugs()
  return slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((blog): blog is BlogPost => blog !== null)
    .sort((a, b) => {
      // Sort by date (newest first)
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
}
