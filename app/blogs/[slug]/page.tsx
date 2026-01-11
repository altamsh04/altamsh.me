import { getBlogBySlug, getAllBlogSlugs } from "@/lib/blogs"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { BlogMarkdown } from "@/components/blog-markdown"

export const dynamicParams = false

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = getBlogBySlug(slug)

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: `${blog.title} | Altamsh Bairagdar`,
    description: blog.summary,
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blogs"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blogs
        </Link>

        <article>
          {blog.featured_image && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={blog.featured_image}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              {blog.category && (
                <Badge variant="secondary" className="text-sm">
                  {blog.category}
                </Badge>
              )}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(blog.date)}
            </div>
          </header>

          {blog.summary && (
            <div className="text-xl text-muted-foreground mb-8 border-l-4 border-primary pl-4">
              {blog.summary}
            </div>
          )}

          <BlogMarkdown content={blog.content} />
        </article>
      </div>
    </div>
  )
}
