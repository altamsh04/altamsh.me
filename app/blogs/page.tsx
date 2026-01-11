import { getAllBlogMetadata } from "@/lib/blogs"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata = {
  title: "Blog Posts | Altamsh Bairagdar",
  description: "Read my latest blog posts about software development, AI, and technology.",
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default function BlogsPage() {
  const blogs = getAllBlogMetadata()

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <svg
            className="h-4 w-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Portfolio
        </Link>
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

        {blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <Card
                key={blog.slug}
                className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
              >
                <Link href={`/blogs/${blog.slug}`}>
                  <div className="flex flex-col sm:flex-row">
                    {blog.featured_image && (
                      <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                        <Image
                          src={blog.featured_image}
                          alt={blog.title}
                          fill
                          className="object-cover"
                          priority={blogs.indexOf(blog) < 6}
                        />
                      </div>
                    )}
                    <CardContent className="p-6 flex-1">
                      <div className="flex flex-col h-full">
                        <div className="flex items-start gap-3 mb-2">
                          {blog.category && blog.category.trim() !== "" && (
                            <Badge variant="secondary" className="flex-shrink-0">
                              {blog.category}
                            </Badge>
                          )}
                          <h2 className="text-xl font-semibold line-clamp-2 flex-1">{blog.title}</h2>
                        </div>
                        {blog.summary && (
                          <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">{blog.summary}</p>
                        )}
                        <div className="flex items-center text-sm text-muted-foreground mt-auto">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(blog.date)}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
