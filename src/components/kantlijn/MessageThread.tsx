import FitBubbles from "./FitBubbles";
import { Avatar } from "./primitives";
import { messageTime, nowrap } from "./text";

export const REPLY_LINE = "Goeie vraag. Ik schreef het voor je op.";

/**
 * Kantlijn's signature: the reader's question as it arrived on Mirjam's phone,
 * optionally with her short reply. Bubbles sit below the photo, never on it.
 */
export default function MessageThread({
  question,
  slug,
  published,
  reply = false,
}: {
  question: string;
  slug: string;
  published: string;
  reply?: boolean;
}) {
  const time = messageTime(slug, published);
  return (
    <div className="thread">
      <p className="thread__stamp">
        <time dateTime={time.iso}>
          <span className="thread__day">{time.day}</span> {time.time}
        </time>
      </p>
      <p className="msg msg--in" data-msg>
        <span className="sr-only">Vraag van een lezer: </span>
        {nowrap(question)}
      </p>
      {reply && (
        <>
          <div className="thread__out">
            <span className="thread__typing" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <p className="msg msg--out" data-msg>
              <span className="sr-only">Mirjam: </span>
              {REPLY_LINE}
            </p>
            <Avatar size={28} />
          </div>
          <p className="thread__receipt">Gelezen {time.readAt}</p>
        </>
      )}
      <FitBubbles />
    </div>
  );
}
