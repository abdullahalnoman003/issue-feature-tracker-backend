export const UserRole = {
  maintainer: "maintainer",
  contributor: "contributor",
} as const;

export type Roles = "maintainer" | "contributor";
export type Types = "bug" | "feature_request";
export type Status = "open"| "in_progress" | "resolved";