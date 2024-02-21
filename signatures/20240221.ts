import masto from "masto";

/**
 * This signature detects a spam pattern where mentions > 2 and
 * content includes https://荒らし.com/ or https://ctkpaarr.org/.
 */
export default function (status: masto.mastodon.streaming.UpdateEvent['payload']): { isSpam: boolean; reason?: string } {
  const mentions = status.mentions.length;

  const isSpam =
    mentions > 2 &&
    (status.content.includes('https://荒らし.com/') || status.content.includes('https://ctkpaarr.org/'));

  const reason = `[Sig:20240221] isSpam = ${isSpam} : mentions: ${mentions} > 2, content includes https://荒らし.com/ or https://ctkpaarr.org/`;
  console.log(reason);

  return {
    isSpam,
    reason: isSpam ? reason : undefined,
  };
}
