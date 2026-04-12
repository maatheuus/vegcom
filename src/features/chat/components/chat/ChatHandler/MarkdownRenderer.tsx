import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  variant?: "default" | "compact";
}

export default function MarkdownRenderer({
  content,
  variant = "default",
}: MarkdownRendererProps) {
  if (variant === "compact") {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="font-maitree text-xs leading-relaxed text-inherit [&+p]:mt-1">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-inherit">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          h1: ({ children }) => (
            <h1 className="font-lora mt-2 mb-1 text-sm font-semibold text-inherit first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-lora mt-2 mb-1 text-xs font-semibold text-inherit first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-lora mt-1.5 mb-1 text-xs font-semibold text-inherit first:mt-0">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="my-1 list-disc space-y-0.5 pl-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-1 list-decimal space-y-0.5 pl-4">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="font-maitree text-xs leading-relaxed text-inherit">
              {children}
            </li>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.startsWith("language-");
            if (isBlock) {
              return (
                <code className="block overflow-x-auto font-mono text-xs whitespace-pre opacity-90">
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded bg-black/10 px-1 py-0.5 font-mono text-xs">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-1 overflow-x-auto rounded-lg bg-black/10 p-2">
              {children}
            </pre>
          ),
          hr: () => <hr className="my-2 border-current opacity-20" />,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline opacity-80 hover:opacity-100"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-1 border-l-2 border-current pl-2 italic opacity-80">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  }

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
          <h1 className="font-lora mt-4 mb-2 text-lg font-semibold text-green-900 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-lora mt-3 mb-2 text-base font-semibold text-green-900 first:mt-0">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-lora mt-3 mb-1.5 text-sm font-semibold text-green-900 first:mt-0">
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
              <code className="block overflow-x-auto font-mono text-xs whitespace-pre text-green-800">
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
          <blockquote className="my-2 border-l-2 border-green-300 pl-3 text-green-700 italic">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
