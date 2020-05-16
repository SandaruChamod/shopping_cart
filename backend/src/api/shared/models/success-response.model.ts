import { SuccessStatus } from "./success-status.enum";

export interface SuccessResponse {
  status: SuccessStatus;
  message: string;
  details?: string;
}

