import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

const markdownToHtml = async (markdown: any) => {
  const result = await unified().use(remarkParse).use(remarkHtml).process(markdown);
  return result.toString();
};

export default async function convertToHtml(content: any) {
  if (!content) return null;

  if (content.startsWith('<')) {
    return content;
  }

  const transformedContent = await markdownToHtml(content);

  return transformedContent;
}
