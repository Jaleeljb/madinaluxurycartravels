export const FILTER_FLEET_EVENT = "madina:filter-fleet";

/** Requests the fleet section filter to a given category, then scrolls to it. */
export function exploreCategory(category: string) {
  window.dispatchEvent(new CustomEvent(FILTER_FLEET_EVENT, { detail: category }));
  document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
