import { pool } from "../../database";
import { AppError } from "../../middleware/globalErrorhandler";
import type { IIssue, IIUsers } from "./issues.interface";

const createIssueIntoDB = async (payload: any) => {
  const { title, description, type, reporter_id } = payload;
  const result = await pool.query(
    `
        INSERT INTO issues(title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *
        `,
    [title, description, type, reporter_id],
  );
  return result;
};
const getAllIssueFromDB = async () => {};
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
      updated_at = NOW()
    WHERE id = $4
    RETURNING *
    `,
    [payload.title, payload.description, payload.type, id],
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
