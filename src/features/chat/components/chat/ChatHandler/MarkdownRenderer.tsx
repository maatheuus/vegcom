import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="font-maitree text-sm leading-relaxed text-green-900 [&+p]:mt-2">
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-green-900">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        h1: ({ children }) => (
          <h1 className="font-lora mb-2 mt-4 text-lg font-semibold text-green-900 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-lora mb-2 mt-3 text-base font-semibold text-green-900 first:mt-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-lora mb-1.5 mt-3 text-sm font-semibold text-green-900 first:mt-0">
            {children}
          </h3>
        ),
        ul: ({ children }) => (
          <ul className="my-2 list-disc space-y-1 pl-5">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="my-2 list-decimal space-y-1 pl-5">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="font-maitree text-sm leading-relaxed text-green-900">
            {children}
          </li>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.startsWith("language-");
          if (isBlock) {
            return (
              <code className="block overflow-x-auto whitespace-pre font-mono text-xs text-green-800">
                {children}
              </code>
            );
          }
          return (
            <code className="rounded bg-green-100 px-1 py-0.5 font-mono text-xs text-green-800">
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="my-2 overflow-x-auto rounded-lg border border-green-100 bg-green-50 p-3">
            {children}
          </pre>
        ),
        hr: () => <hr className="my-3 border-green-200" />,
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline hover:text-green-800"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="my-2 border-l-2 border-green-300 pl-3 italic text-green-700">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
