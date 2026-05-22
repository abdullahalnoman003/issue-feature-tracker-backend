export interface IUser {
    id: number;
    name: string;
    email: string;
}
export interface IIssue {
    title : string;
    description : string;
    type : string;
}
export interface IIUsers{
    id: number;
    name: string;
    role: string;
    iat : number;
    exp: number;

}
