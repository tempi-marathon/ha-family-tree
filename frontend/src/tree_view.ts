/** Tree structure helpers for the person tree tab. */

export interface TreeNodeSummary {
  id: string;
  name: string;
  sex?: string;
  is_living?: boolean;
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

export function flattenParents(
  parents: Array<Record<string, unknown>> | undefined,
): TreeNodeSummary[] {
  return (parents || []).map((p) => ({
    id: String(p.id),
    name: nodeName(p),
    sex: typeof p.sex === "string" ? p.sex : undefined,
    is_living: Boolean(p.is_living),
  }));
}

export function flattenChildren(
  children: Array<Record<string, unknown>> | undefined,
): TreeNodeSummary[] {
  return (children || []).map((c) => ({
    id: String(c.id),
    name: nodeName(c),
    sex: typeof c.sex === "string" ? c.sex : undefined,
    is_living: Boolean(c.is_living),
  }));
}

export function partnerNames(
  partners: Array<Record<string, unknown>> | undefined,
): string[] {
  const names: string[] = [];
  for (const union of partners || []) {
    const list = (union.partners as Array<Record<string, unknown>> | undefined) || [];
    for (const p of list) {
      names.push(nodeName(p));
    }
  }
  return names;
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
