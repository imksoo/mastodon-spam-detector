import masto from "masto";

/**
 * This signature detects a spam pattern where a status has more than 2 mentions,
 * the username is 10 characters long, the account was created less than 24 hours ago,
 * and the account has 0 followers.
 */
export default function (status: masto.mastodon.streaming.UpdateEvent['payload']): { isSpam: boolean; reason?: string } {
  const mentions = status.mentions.length;
  const username = status.account.username;
  // const createdAt = status.account.createdAt;
  // const createdInSeconds = (new Date().getTime() - new Date(createdAt).getTime()) / 1000;
  const followersCount = status.account.followersCount;

  const isSpam =
    mentions > 2 &&
    username.length === 10 &&
    // createdInSeconds < 86400 &&
    followersCount === 0;

  // const reason = `[Sig:20240217] isSpam = ${isSpam} : mentions: ${mentions} > 2, username: ${username} length ${username.length} = 10, createdInSeconds: ${createdInSeconds} < 86400 sec, followersCount: ${followersCount} = 0`;
  const reason = `[Sig:20240217] isSpam = ${isSpam} : mentions: ${mentions} > 2, username: ${username} length ${username.length} = 10, followersCount: ${followersCount} = 0`;
  console.log(reason);

  return {
    isSpam,
    reason: isSpam ? reason : undefined,
  };
}
