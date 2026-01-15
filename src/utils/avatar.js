export function generateRandomAvatar(seed = Math.random()) {
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}`;
}
