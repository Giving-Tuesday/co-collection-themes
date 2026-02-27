import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import DOMPurify from 'dompurify';

const markdownToHtml = async (markdown: string) => {
  const result = await unified().use(remarkParse).use(remarkHtml).process(markdown);
  return DOMPurify.sanitize(result.toString());
};

export default async function convertToHtml(content: string | string[]) {
  if (!content) return null;
  const contentAsString = Array.isArray(content) ? content[0] : content;
  if (contentAsString && contentAsString.startsWith('<')) {
    return DOMPurify.sanitize(contentAsString);
  }
  const transformedContent = await markdownToHtml(contentAsString || '');
  return transformedContent;
}
