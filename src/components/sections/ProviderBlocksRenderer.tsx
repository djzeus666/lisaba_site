import { DocList, InfoCard } from "@/components/sections/ProviderShell";
import type { ProviderBlock } from "@/lib/cms/queries";

export function ProviderBlocksRenderer({ blocks }: { blocks: ProviderBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.blockType}-${index}`;
        if (block.blockType === "heading") {
          return (
            <h2 key={key} className="text-lg font-bold text-brand-black">
              {block.text}
            </h2>
          );
        }
        if (block.blockType === "paragraph") {
          return (
            <p key={key} className="leading-relaxed text-brand-black/80">
              {block.text}
            </p>
          );
        }
        if (block.blockType === "list") {
          return (
            <ul key={key} className="list-disc space-y-2 pl-5">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }
        if (block.blockType === "docs") {
          return (
            <InfoCard key={key}>
              <DocList items={block.items} />
            </InfoCard>
          );
        }
        if (block.blockType === "card") {
          return (
            <InfoCard key={key} title={block.title}>
              {block.paragraphs?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {block.lists?.map((list, li) => (
                <div key={list.heading || li}>
                  {list.heading ? (
                    <p className="font-semibold text-brand-black">{list.heading}</p>
                  ) : null}
                  <ul className="list-disc space-y-1.5 pl-5">
                    {list.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
              {block.docs?.length ? <DocList items={block.docs} /> : null}
            </InfoCard>
          );
        }
        return null;
      })}
    </>
  );
}
