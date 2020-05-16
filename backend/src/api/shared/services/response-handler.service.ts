import { Injectable } from "@nestjs/common";

import { SuccessResponse } from "../models/success-response.model";

import { SuccessStatus } from "../models/success-status.enum";

/**
 * class to represent response handler service.
 * @class ResponseHandlerService
 */
@Injectable()
export class ResponseHandlerService {

  /**
   * Responsible for return success response objects with given content.
   * @param status: SuccessStatus
   * @param message: string
   * @param details: string
   */
  public getSuccessResponse(status: SuccessStatus, message: string, details: string): SuccessResponse {
    return {
      status: status,
      message: message,
      details: details
    }
  }
}
