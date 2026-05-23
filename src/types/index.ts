export const UserRole = {
  maintainer: "maintainer",
  contributor: "contributor",
} as const;

export type Roles = "maintainer" | "contributor";
export type Types = "bug" | "feature_request";
export type Status = "open" | "in_progress" | "resolved";

export type UserCreate = {
  name: string;
  email: string;
  password: string;
  role?: Roles;
};
export type UserIssueCreate = {
  title: string;
  description: string;
  type: Types;
  reporter_id: number;
};
