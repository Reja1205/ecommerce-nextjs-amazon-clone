// lib/utils.ts
export function getEstimatedDeliveryDate(): string {
  const now = new Date();
  now.setDate(now.getDate() + 4); // average 4-day delivery
  return now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
