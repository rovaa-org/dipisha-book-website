import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import { promises as fs } from 'fs';
import path from 'path';

const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

const owner = process.env.REPO_OWNER || 'your-github-username';
const repo = process.env.REPO_NAME || 'your-repo-name';
const branch = 'main';

// Helper to create a slug from a title
const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^؀-ۿݐ-ݿa-zA-Z0-9-]+/g, '')
    .replace(/--+/g, '-');

async function commitFile(filePath: string, content: string, commitMessage: string) {
  const absolutePath = path.join(process.cwd(), filePath);
  const dir = path.dirname(absolutePath);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(absolutePath, content, 'utf8');

  const blob = await octokit.git.createBlob({
    owner,
    repo,
    content: Buffer.from(content).toString('base64'),
    encoding: 'base64',
  });

  const { data: refData } = await octokit.git.getRef({
    owner,
    repo,
    ref: `heads/${branch}`,
  });

  const { data: commitData } = await octokit.git.getCommit({
    owner,
    repo,
    commit_sha: refData.object.sha,
  });

  const { data: treeData } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: commitData.tree.sha,
    tree: [
      {
        path: filePath,
        mode: '100644',
        type: 'blob',
        sha: blob.data.sha,
      },
    ],
  });

  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: commitMessage,
    tree: treeData.sha,
    parents: [refData.object.sha],
  });

  await octokit.git.updateRef({
    owner,
    repo,
    ref: `heads/${branch}`,
    sha: newCommit.sha,
  });
}

export async function POST(req: NextRequest) {
  try {
    const { title, contentType, bookTitle, markdownContent } = await req.json();

    if (!title || !contentType || !markdownContent) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const titleSlug = slugify(title);

    if (contentType === 'Standalone Blog Post') {
      const filePath = `src/content/blogs/${titleSlug}.md`;
      const commitMessage = `feat: add new blog post - ${title}`;
      await commitFile(filePath, markdownContent, commitMessage);
      return NextResponse.json({ message: 'Blog post created successfully' }, { status: 201 });
    } else if (contentType === 'Book Chapter') {
      if (!bookTitle) {
        return NextResponse.json({ message: 'Book title is required for chapters' }, { status: 400 });
      }

      const bookSlug = slugify(bookTitle);
      const bookDirectory = `src/content/books/${bookSlug}`;
      const chapterFilePath = `${bookDirectory}/${titleSlug}.md`;
      const metaFilePath = `${bookDirectory}/_meta.md`;

      // Check if book directory exists, if not, create it with a _meta.md file
      const absoluteBookDirectory = path.join(process.cwd(), bookDirectory);
      try {
        await fs.access(absoluteBookDirectory);
      } catch {
        const metaContent = `---\ntitle: ${bookTitle}\n---`;
        const metaCommitMessage = `feat: create new book - ${bookTitle}`;
        await commitFile(metaFilePath, metaContent, metaCommitMessage);
      }

      const chapterCommitMessage = `feat: add new chapter '${title}' to book '${bookTitle}'`;
      await commitFile(chapterFilePath, markdownContent, chapterCommitMessage);

      return NextResponse.json({ message: 'Book chapter created successfully' }, { status: 201 });
    }

    return NextResponse.json({ message: 'Invalid content type' }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}