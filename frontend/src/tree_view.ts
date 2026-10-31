/** Tree structure helpers for the person tree tab. */

export interface TreeNodeSummary {
  id: string;
  name: string;
  sex?: string;
  is_living?: boolean;
  profile_media_id?: string | null;
  birth_sort_date?: string | null;
}

export function nodeName(node: Record<string, unknown> | null | undefined): string {
  if (!node) return "Unknown";
  if (typeof node.name === "string" && node.name) return node.name;
  if (typeof node.display_name === "string" && node.display_name) {
    return node.display_name;
  }
  const parts = [node.given_names, node.surname_prefix, node.surname]
    .map((p) => (typeof p === "string" ? p.trim() : ""))
    .filter(Boolean);
  return parts.join(" ") || "Unknown";
}

function toSummary(node: Record<string, unknown>): TreeNodeSummary {
  return {
    id: String(node.id || ""),
    name: nodeName(node),
    sex: typeof node.sex === "string" ? node.sex : undefined,
    is_living: Boolean(node.is_living),
    profile_media_id:
      typeof node.profile_media_id === "string" ? node.profile_media_id : null,
    birth_sort_date:
      typeof node.birth_sort_date === "string" ? node.birth_sort_date : null,
  };
}

/**
 * Focal person plus siblings, ordered by birth date (oldest first). People with no
 * known birth date are placed last; ties (and undated people) fall back to a stable
 * name comparison. Siblings from the backend already include full and half siblings
 * (shared-parent); step-siblings are excluded server-side.
 */
export function flattenSiblings(
  focus: TreeNodeSummary,
  siblings: Array<Record<string, unknown>> | undefined,
): TreeNodeSummary[] {
  const all = [focus, ...(siblings || []).map(toSummary)];
  return all.sort((a, b) => {
    const da = a.birth_sort_date || "";
    const db = b.birth_sort_date || "";
    if (da && db) {
      if (da !== db) return da < db ? -1 : 1;
    } else if (da) {
      return -1;
    } else if (db) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });
}

export function flattenParents(
  parents: Array<Record<string, unknown>> | undefined,
): TreeNodeSummary[] {
  return (parents || []).map(toSummary);
}

export function flattenChildren(
  children: Array<Record<string, unknown>> | undefined,
): TreeNodeSummary[] {
  return (children || []).map(toSummary);
}

export function partnerNames(
  partners: Array<Record<string, unknown>> | undefined,
): string[] {
  return flattenPartners(partners).map((p) => p.name);
}

/** Flatten union partners into person summaries (deduped by id when present). */
export function flattenPartners(
  partners: Array<Record<string, unknown>> | undefined,
): TreeNodeSummary[] {
  const out: TreeNodeSummary[] = [];
  const seen = new Set<string>();
  for (const union of partners || []) {
    const list = (union.partners as Array<Record<string, unknown>> | undefined) || [];
    for (const p of list) {
      const summary = toSummary(p);
      if (summary.id) {
        if (seen.has(summary.id)) continue;
        seen.add(summary.id);
      }
      out.push(summary);
    }
  }
  return out;
}

export function generationLabel(generation: number, direction: "up" | "down"): string {
  if (generation <= 0) return "self";
  if (direction === "up") {
    if (generation === 1) return "parents";
    if (generation === 2) return "grandparents";
    if (generation === 3) return "great-grandparents";
    return `gen −${generation}`;
  }
  if (generation === 1) return "children";
  if (generation === 2) return "grandchildren";
  if (generation === 3) return "great-grandchildren";
  return `gen +${generation}`;
}
