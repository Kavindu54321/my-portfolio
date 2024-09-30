// @flow strict
import { personalData } from "@/utils/data/personal-data";

// Fetch blog data based on slug
async function getBlog(slug) {
  const res = await fetch(`https://dev.to/api/articles/${personalData.devUsername}/${slug}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  return data;
}

// Define the generateStaticParams function
export async function generateStaticParams() {
  const slugs = ['post-1', 'post-2', 'post-3']; // Replace with actual slugs or fetch them

  return slugs.map((slug) => ({
    slug,
  }));
}

// BlogDetails component
async function BlogDetails({ params }) {
  const slug = params.slug;
  const blog = await getBlog(slug);

  return (
    <div>
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.body_html }} />
    </div>
  );
}

export default BlogDetails;
