import blog1 from "../assets/blogs images/blog-1.jpg";
import blog2 from "../assets/blogs images/blog-2.jpg";
import blog3 from "../assets/blogs images/blog-4.jpg";
import blog4 from "../assets/blogs images/blog-3.jpg";

export interface Blog {
  id: number;

  title: string;
  slug: string;

  excerpt: string;
  content: string;

  image: string;

  publishedAt: string;
  author: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: "Step Into Style: The Hottest Sneaker Trends of the Season",
    slug: "step-into-style-the-hottest-sneaker-trends-of-the-season",
    excerpt:
      "Explore the must-have sneakers dominating streetwear and sportswear this year.",
    content:
      "Explore the must-have sneakers dominating streetwear and sportswear this year.",
    image: blog1,
    publishedAt: "07-08-2026",
    author: "Aftab",
  },
  {
    id: 2,
    title: "Running on Clouds: Best Performance Shoes for Every Athlete",
    slug: "running-on-clouds-best-performance-shoes-for-every-athlete",
    excerpt:
      "Discover the top sneakers that blend speed, comfort, and style for peak performance.",
    content:
      "Discover the top sneakers that blend speed, comfort, and style for peak performance.",
    image: blog2,
    publishedAt: "07-08-2026",
    author: "Aftab",
  },
  {
    id: 3,
    title: "From Courts to Streets: How High-Tops Became a Fashion Staple",
    slug: "from-courts-to-streets-how-high-tops-became-a-fashion-staple",
    excerpt:
      "Uncover the journey of high-top sneakers from sports arenas to everyday wear.",
    content:
      "Uncover the journey of high-top sneakers from sports arenas to everyday wear.",
    image: blog3,
    publishedAt: "07-08-2026",
    author: "Aftab",
  },
  {
    id: 4,
    title: "Sustainable Kicks: Eco-Friendly Sneakers You’ll Love",
    slug: "sustainable-kicks-eco-friendly-sneakers-you’ll-love",
    excerpt:
      "Find stylish, sustainable footwear that’s good for your feet—and the planet.",
    content:
      "Find stylish, sustainable footwear that’s good for your feet—and the planet.",
    image: blog4,
    publishedAt: "07-08-2026",
    author: "Aftab",
  },
];
