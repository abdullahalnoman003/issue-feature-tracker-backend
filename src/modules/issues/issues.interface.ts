export interface IUser {
    id: number;
    name: string;
    email: string;
}
export interface IIssue {
  title?: string;
  description?: string;
  type?: "bug" | "feature_request";
  status?: "open" | "in_progress" | "resolved";
}
export interface IIUsers{
    id: number;
    name: string;
    role: string;
    iat : number;
    exp: number;

}
