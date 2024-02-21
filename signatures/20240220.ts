import masto from "masto";

/**
 * This signature detects a spam pattern where avatar ends with /missing.png,
 * mentions > 2, followingCount = 0, and followersCount = 0.
 */
export default function (status: masto.mastodon.streaming.UpdateEvent['payload']): { isSpam: boolean; reason?: string } {
  const mentions = status.mentions.length;
  const avatar = status.account.avatar;
  const followingCount = status.account.followingCount;
  const followersCount = status.account.followersCount;

  const isSpam =
    avatar.endsWith('/missing.png') &&
    mentions > 2 &&
    followingCount === 0 &&
    followersCount === 0;

  const reason = `[Sig:20240220] isSpam = ${isSpam} : avatar: ${avatar} ends with /missing.png, mentions: ${mentions} > 2, followingCount: ${followingCount} = 0, followersCount: ${followersCount} = 0`;
  console.debug(reason);

  return {
    isSpam,
    reason: isSpam ? reason : undefined,
  };
}
