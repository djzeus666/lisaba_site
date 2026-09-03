import type { ReactNode } from "react";

export function renderPlainBody(body: string): ReactNode[] {
  const blocks = body
    .trim()
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return blocks.map((block, index) => {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const isList = lines.length > 0 && lines.every((line) => line.startsWith("-"));

    if (isList) {
      return (
        <ul key={index} className="list-disc space-y-2 pl-5">
          {lines.map((line, lineIndex) => (
            <li key={`${index}-${lineIndex}`}>{line.replace(/^-\s*/, "")}</li>
          ))}
        </ul>
      );
    }

    return <p key={index}>{block}</p>;
  });
}

export function SimplePageBody({ body }: { body: string }) {
  return <>{renderPlainBody(body)}</>;
}
