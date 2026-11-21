import type { Element, ElementContent, Root as HastRoot, RootContent } from "hast";
import type { Root as MdastRoot, PhrasingContent, Text } from "mdast";
import { SKIP, visit } from "unist-util-visit";

const PSYCH_K = /(PSYCH-K(?:-\p{L}+)?[?.,!:]?)/u;

/**
 * Wraps every "PSYCH-K" in <span class="nowrap"> so it never breaks at the hyphen.
 * (Lora has no non-breaking hyphen glyph, so U+2011 is not an option.)
 */
export function remarkNowrap() {
  return (tree: MdastRoot) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index === undefined) return;
      if ((parent.data as { kantlijnNowrap?: boolean } | undefined)?.kantlijnNowrap) return;
      const parts = node.value.split(PSYCH_K).filter(Boolean);
      if (parts.length === 1 && !PSYCH_K.test(parts[0])) return;

      const replacement = parts.map((value) =>
        PSYCH_K.test(value)
          ? ({
              type: "emphasis",
              data: { kantlijnNowrap: true, hName: "span", hProperties: { className: ["nowrap"] } },
              children: [{ type: "text", value }],
            } as PhrasingContent)
          : ({ type: "text", value } as Text)
      );
      parent.children.splice(index, 1, ...(replacement as typeof parent.children));
      return [SKIP, index + replacement.length];
    });
  };
}

const hasClass = (el: Element, name: string) =>
  Array.isArray(el.properties.className) && el.properties.className.includes(name);

const addClass = (el: Element, name: string) => {
  const current = Array.isArray(el.properties.className) ? el.properties.className : [];
  if (!hasClass(el, name)) el.properties.className = [...current, name];
};

const isElement = (node: RootContent | ElementContent, tag?: string): node is Element =>
  node.type === "element" && (!tag || node.tagName === tag);

type MdxFlow = { type: "mdxJsxFlowElement"; name: string | null; children: (RootContent | ElementContent)[] };

/**
 * Numbers the h2s (`<span class="num" aria-hidden>`; runs after rehype-slug so the
 * number isn't part of the id) and gives the first paragraph after the first h2
 * the drop cap, also when that paragraph sits inside <Kantlijn>.
 */
export function rehypeKantlijn() {
  return (tree: HastRoot) => {
    let n = 0;
    let dropDone = false;

    for (const node of tree.children) {
      if (isElement(node, "h2")) {
        n += 1;
        node.children = [
          {
            type: "element",
            tagName: "span",
            properties: { className: ["num"], ariaHidden: "true" },
            children: [{ type: "text", value: String(n).padStart(2, "0") }],
          },
          { type: "element", tagName: "span", properties: {}, children: node.children },
        ];
        continue;
      }
      if (n === 0 || dropDone) continue;

      if (isElement(node, "p")) {
        addClass(node, "drop");
        dropDone = true;
        continue;
      }
      const flow = node as unknown as MdxFlow;
      if (flow.type === "mdxJsxFlowElement" && flow.name === "Kantlijn") {
        const p = flow.children.find((c) => isElement(c, "p")) as Element | undefined;
        if (p) {
          addClass(p, "drop");
          dropDone = true;
        }
      }
    }
  };
}
