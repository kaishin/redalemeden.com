import MarkdownIt from "markdown-it";
import footnote from "markdown-it-footnote";

const parser = new MarkdownIt({ html: true }).use(footnote);

const MAX_LENGTH = 160;

function firstParagraphText(body: string): string {
  const tokens = parser.parse(body, {});

  for (let i = 0; i < tokens.length; i += 1) {
    if (tokens[i].type !== "paragraph_open" || tokens[i].level !== 0) continue;
    const inline = tokens[i + 1];
    if (inline?.type !== "inline") continue;

    let text = "";
    for (const child of inline.children ?? []) {
      if (child.type === "text") text += child.content;
      else if (child.type === "softbreak" || child.type === "hardbreak")
        text += " ";
      else if (child.type === "code_inline") text += child.content;
    }
    text = text.trim();
    if (text) return text;
  }

  return "";
}

export function excerpt(body: string): string {
  const text = firstParagraphText(body);
  if (text.length <= MAX_LENGTH) return text;

  const slice = text.slice(0, MAX_LENGTH);
  const boundary = slice.lastIndexOf(" ");
  const truncated = boundary > 0 ? slice.slice(0, boundary) : slice;
  return `${truncated.trimEnd()}…`;
}
