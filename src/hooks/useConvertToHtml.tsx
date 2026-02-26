import { useEffect, useState } from 'react';
import convertToHtml from '../utils/convert-to-html.utils';

export default function useConvertToHtml(rawHtml: string) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    const convert = async () => {
      const data = await convertToHtml(rawHtml);
      setHtml(data);
    };
    convert();
  }, [rawHtml]);

  return html;
}
