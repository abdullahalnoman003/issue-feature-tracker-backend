import type { Request, Response } from "express";
import { issueServices } from "./issues.service";
import responseSender from "../../utility/responseSender";
import { AppError } from "../../middleware/globalErrorhandler";

const createReport = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }
  const reporterId = req.user.id;
  const payload = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    reporter_id: reporterId,
  };
  const result = await issueServices.createIssueIntoDB(payload);
  responseSender(res, {
    statusCode: 201,
    success: true,
    message: "Issue created successfully",
    data: result.rows[0],
  });
};
const getAllReport = async (req: Request, res: Response) => {
    res.status(200).json({
        message: "API OK"
    })
};
const getSingleReport = async (req: Request, res : Response) => {
    const {id }= req.params;
    const result = await issueServices.getSingleIssueFromDB(id as string);
    res.status(200).json({
        success: true,
        data : result,
    })
};
const updateSingleReport = async () => {};
const deleteSingleReport = async () => {};
export const issuesController = {
  createReport,
  getAllReport,
  getSingleReport,
  updateSingleReport,
  deleteSingleReport,
};
