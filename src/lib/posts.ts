import { BlogPost } from "./types";

export const posts: BlogPost[] = [
  {
    slug: "why-feature-engineering-still-matters-in-age-of-llms",
    title: "Why Feature Engineering Still Matters in the Age of LLMs",
    excerpt:
      "Everyone is talking about foundation models, but the quiet art of crafting features remains one of the highest-leverage skills in data science. Here's why.",
    content: `
## The Hype vs. The Reality

Large Language Models have captured every headline, and for good reason — they're transformative. But beneath the dazzling demos, most production ML systems still rely on classical, tabular models where **feature engineering is king**.

### The 80/20 Rule Still Applies

In my experience shipping models across healthcare, fintech, and e-commerce, the single most impactful thing you can do is spend time understanding your data and building meaningful features. A well-crafted ratio or lag feature often beats adding another transformer layer.

### When LLMs Don't Help

- **Structured / tabular data**: XGBoost with great features still dominates Kaggle and production.
- **Low-latency requirements**: You can't always afford a 500ms inference call.
- **Small data regimes**: Feature engineering lets you inject domain knowledge when you have <10K rows.

### A Practical Example

Imagine predicting customer churn. Raw columns give you signup date and last login. But *engineered features* like "days since last login", "login frequency trend over 30 days", and "ratio of support tickets to orders" carry far more predictive signal.

\`\`\`python
df["days_since_last_login"] = (pd.Timestamp.now() - df["last_login"]).dt.days
df["login_trend_30d"] = df.groupby("user_id")["login"].transform(
    lambda x: x.rolling(30).mean()
)
df["ticket_order_ratio"] = df["support_tickets"] / (df["orders"] + 1)
\`\`\`

### The Bottom Line

LLMs are incredible tools, but they haven't replaced the fundamentals. If you want to become a stronger data scientist, invest in feature engineering — it compounds over every project you touch.
    `,
    date: "Apr 28, 2026",
    readTime: "5 min read",
    category: "Machine Learning",
    featured: true,
    author: { name: "Pujitha" },
  },
  {
    slug: "building-rag-pipeline-from-scratch",
    title: "Building a RAG Pipeline from Scratch: Lessons from Production",
    excerpt:
      "Retrieval-Augmented Generation sounds simple in theory. In practice, there are dozens of subtle decisions that determine whether your pipeline is useful or hallucinating.",
    content: `
## What is RAG, Really?

Retrieval-Augmented Generation (RAG) combines a retrieval system (usually vector search) with a generative LLM. The retriever finds relevant documents, and the LLM synthesizes an answer grounded in those documents.

### The Architecture

At a high level, a RAG pipeline looks like this:

1. **Ingest** — chunk your documents and embed them into a vector store
2. **Retrieve** — given a user query, find the top-K most similar chunks
3. **Generate** — feed those chunks + the query into an LLM for a grounded answer

### Mistakes I Made (So You Don't Have To)

**Chunk size matters enormously.** Too small and you lose context. Too large and you dilute the signal. I settled on ~500 tokens with 50-token overlap after extensive experimentation.

**Don't skip reranking.** Vector similarity is a rough proxy. Adding a cross-encoder reranker after retrieval improved answer quality by ~30% in my benchmarks.

**Metadata filtering is underrated.** If your user asks about "Q1 2026 revenue", you should filter by date metadata *before* vector search, not just rely on semantic similarity.

### My Recommended Stack

- **Embeddings**: OpenAI \`text-embedding-3-large\` or open-source \`BGE-M3\`
- **Vector store**: Pinecone or pgvector (if you want to stay in Postgres)
- **Reranker**: Cohere Rerank or a fine-tuned cross-encoder
- **LLM**: GPT-4o or Claude for generation

### Final Thoughts

RAG is not a silver bullet. It works best when your documents are well-structured, your chunking is thoughtful, and you evaluate rigorously. But when done right, it's one of the most practical ways to make LLMs useful for your organization.
    `,
    date: "Apr 24, 2026",
    readTime: "7 min read",
    category: "AI Engineering",
    author: { name: "Pujitha" },
  },
  {
    slug: "pandas-vs-polars-2026-benchmarks",
    title: "Pandas vs. Polars in 2026: Real-World Benchmarks That Surprised Me",
    excerpt:
      "I ran Polars against Pandas on 5 production workloads. The results weren't what I expected — and they changed how I write data pipelines.",
    content: `
## Why I Finally Tested Polars

I've been a Pandas loyalist for years. But after hearing constant praise for Polars — its lazy evaluation, Rust-powered backend, and expressive API — I decided to put it to the test on real workloads, not toy benchmarks.

### The Workloads

1. **CSV ingestion** — 2GB file, mixed types
2. **GroupBy aggregation** — 50M rows, 5 group keys
3. **Window functions** — rolling averages on time series
4. **Join + filter** — two large DataFrames, inner join + conditional filter
5. **String operations** — regex extraction on 10M text rows

### Results Summary

| Workload | Pandas | Polars | Speedup |
|---|---|---|---|
| CSV Ingestion | 45s | 8s | 5.6x |
| GroupBy | 12s | 1.8s | 6.7x |
| Window Functions | 8s | 2.1s | 3.8x |
| Join + Filter | 15s | 3.2s | 4.7x |
| String Ops | 22s | 6s | 3.7x |

### What Surprised Me

Polars was consistently faster, but the **developer experience** gap is narrowing. Polars' expression API is actually *more composable* than Pandas for complex transforms. The lazy API lets you write declarative pipelines that Polars optimizes end-to-end.

### Should You Switch?

- **New projects**: Yes, start with Polars.
- **Legacy codebases**: Migrate incrementally — Polars can read Pandas DataFrames.
- **Quick scripting**: Pandas is still fine for <100K rows and one-off analysis.

The ecosystem is maturing fast. Polars + DuckDB is becoming my default stack for local data work.
    `,
    date: "Apr 19, 2026",
    readTime: "4 min read",
    category: "Data Engineering",
    author: { name: "Pujitha" },
  },
  {
    slug: "welcome-to-the-neural-notebook",
    title: "Welcome to The Neural Notebook — Let's Explore Together!",
    excerpt:
      "Why I'm starting this blog, what you can expect, and how I hope to build a community around practical data science and AI.",
    content: `
## Hello, World! 👋

Welcome to **The Neural Notebook** — a space where I share my honest thoughts, experiments, and lessons learned in data science and AI.

### Why This Blog?

I've been working in data science for a while now, and I've noticed something: there's a huge gap between the polished tutorials you find online and the messy reality of building ML systems in production.

This blog is my attempt to bridge that gap. Expect:

- **Practical tutorials** with real code, not just theory
- **Honest post-mortems** when projects don't go as planned
- **Tool reviews** comparing frameworks I actually use
- **Career reflections** on growing as a data scientist

### What I Won't Do

- Regurgitate documentation you can read yourself
- Hype tools without testing them
- Pretend every project is a success story

### Let's Connect

I'd love for this to be a conversation, not a monologue. If you find something useful, have a question, or want to suggest a topic — reach out. Subscribe below to get new posts delivered to your inbox.

Here's to learning in public. 🚀
    `,
    date: "Apr 10, 2026",
    readTime: "2 min read",
    category: "General",
    author: { name: "Pujitha" },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  return posts.find((p) => p.featured);
}

export function getLatestPosts(): BlogPost[] {
  return posts.filter((p) => !p.featured);
}

export function getTrendingPosts(): BlogPost[] {
  return posts.slice(0, 4);
}
