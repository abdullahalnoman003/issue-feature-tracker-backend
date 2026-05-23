
import { pool } from "../../database/index";
import { AppError } from "../../middleware/globalErrorhandler";
import type { UserIssueCreate } from "../../types";
import type { IIssue, IIUsers } from "./issues.interface";

type IssueRow = {
  id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  reporter_id: number;
  created_at: string | Date;
  updated_at: string | Date;
};
type UserRow = { id: number; name: string; role: string };

const createIssueIntoDB = async (payload: UserIssueCreate) => {
  const { title, description, type, reporter_id } = payload;
  const result = await pool.query(
    `
        INSERT INTO issues(title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *
        `,
    [title, description, type, reporter_id],
  );
  return result;
};
const getAllIssueFromDB = async (
  sort?: string,
  type?: string,
  status?: string,
) => {
  const order = sort === "oldest" ? "ASC" : "DESC";
  let base = `SELECT * FROM issues WHERE 1=1`;
  const params: string[] = [];

  if (type) {
    params.push(type);
    base += ` AND type = $${params.length}`;
  }

  if (status) {
    params.push(status);
    base += ` AND status = $${params.length}`;
  }

  base += ` ORDER BY created_at ${order}`;

  const issuesResult = await pool.query(base, params);

  const issues = issuesResult.rows as IssueRow[];
  if (issues.length === 0) {
    return [];
  }

  const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];
  const userResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = ANY($1::int[])`,
    [reporterIds],
  );

  const usersById: Record<number, UserRow> = {};
  for (const user of userResult.rows as UserRow[]) {
    usersById[user.id] = user;
  }

  return issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: usersById[issue.reporter_id],
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }));
};
const getSingleIssueFromDB = async (id: string) => {
  const issueResult = await pool.query(
    `
    SELECT * FROM issues WHERE id=$1
    `,
    [id],
  );

  if (issueResult.rows.length === 0) {
    throw new AppError("Issue not found", 404);
  }

  const issue = issueResult.rows[0];

  const userResult = await pool.query(
    `
    SELECT id, name, role FROM users WHERE id=$1
    `,
    [issue.reporter_id],
  );

  const user = userResult.rows[0];

  const singleIssue = {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: user,
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };

  return singleIssue;
};
const updateIssueFromDB = async (
  payload: IIssue,
  user: IIUsers,
  id: string,
) => {
  const issueResult = await pool.query(`SELECT * FROM issues WHERE id=$1`, [
    id,
  ]);
  if (issueResult.rows.length === 0) {
    throw new AppError("Issue not found", 404);
  }
  const issue = issueResult.rows[0];
  if (user.role === "contributor") {
    if (issue.reporter_id !== user.id) {
      throw new AppError("Forbidden: not your issue", 403);
    }
    if (issue.status !== "open") {
      throw new AppError("Cannot update issue unless it is open", 403);
    }
  }
  const updatedResult = await pool.query(
    `
    UPDATE issues
    SET 
      title = COALESCE($1, title),
      description = COALESCE($2, description),
      type = COALESCE($3, type),
      status = COALESCE($4, status),
      updated_at = NOW()
    WHERE id = $5
    RETURNING *
    `,
    [ payload.title ?? null, payload.description ?? null, payload.type ?? null,payload.status ?? null,id,],
  );

  return updatedResult.rows[0];
};
const deleteIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM issues WHERE id=$1 RETURNING *
      `,
    [id],
  );

  if (result.rows.length === 0) {
    throw new AppError("Issue not found", 404);
  }

  return result;
};

export const issueServices = {
  createIssueIntoDB,
  getAllIssueFromDB,
  getSingleIssueFromDB,
  updateIssueFromDB,
  deleteIssueFromDB,
};
