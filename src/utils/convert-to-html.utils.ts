import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

const markdownToHtml = async (markdown: string) => {
  const result = await unified().use(remarkParse).use(remarkHtml).process(markdown);
  return result.toString();
};

export default async function convertToHtml(content: string | string[]) {
  if (!content) return null;
  const contentAsString = Array.isArray(content) ? content[0] : content;
  if (contentAsString && contentAsString.startsWith('<')) {
    return contentAsString;
  }
  const transformedContent = await markdownToHtml(contentAsString || '');
  return transformedContent;
}
