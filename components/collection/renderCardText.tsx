import CardLink from "@/components/collection/CardLink";

/* Renders free text, turning inline card tokens into subtle card-get
   links. Token syntax (written by the shop in the admin panel):

     [表示するテキスト](card:CARD-CODE)

   Everything else is left as-is (the parent keeps whitespace-pre-wrap
   so line breaks are preserved). */

const TOKEN = /\[([^\]\n]+)\]\(card:([A-Za-z0-9_-]+)\)/g;

export function renderCardText(
  text: string | null | undefined,
): React.ReactNode {
  if (!text) return null;
  const out: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <CardLink key={key++} code={m[2].toUpperCase()}>
        {m[1]}
      </CardLink>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** True when the text contains at least one card token. */
export function hasCardToken(text: string | null | undefined): boolean {
  if (!text) return false;
  TOKEN.lastIndex = 0;
  return TOKEN.test(text);
}
