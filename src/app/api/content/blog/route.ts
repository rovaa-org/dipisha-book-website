import { Octokit } from "octokit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, status, content } = await req.json();

  const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

  const owner = "rovaa-org";
  const repo = "dipisha-book-website";
  const path = `src/content/blogs/${title.toLowerCase().replace(/ /g, "-")}.md`;

  const markdownContent = `---
title: ${title}
status: ${status}
date: ${new Date().toISOString()}
---

${content}`;

  try {
    await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner,
      repo,
      path,
      message: `feat: add blog post - ${title}`,
      content: Buffer.from(markdownContent).toString("base64"),
    });

    return NextResponse.json({ message: "Blog post saved successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to save blog post." }, { status: 500 });
  }
}
