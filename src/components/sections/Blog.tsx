import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const articles = [
  {
    title: "How to attract investors with your pitch",
    excerpt: "Learn the most effective techniques to get the attention of potential investors.",
    category: "Tips",
    readTime: "5 min"
  },
  {
    title: "Common mistakes when presenting your startup",
    excerpt: "Avoid these common mistakes that can ruin your presentation.",
    category: "Guides",
    readTime: "4 min"
  },
  {
    title: "Optimize your presentation for immediate impact",
    excerpt: "Proven techniques to maximize the impact of your first minutes.",
    category: "Strategy",
    readTime: "6 min"
  }
]

export default function Blog() {
  return (
    <section aria-label="Resources and Blog" className="py-24 bg-gradient-to-br from-rosy-brown/20 to-violet-jtc/10">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center text-violet-jtc mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Learn to Create Impactful Pitches
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-violet-jtc">{article.category}</span>
                  <span className="text-sm text-gray-500">· {article.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-violet-jtc mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <Link 
                  href="#" 
                  className="inline-flex items-center text-violet-jtc hover:text-violet-jtc/80"
                >
                  Read more <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
