import { ZodIssueCode } from "zod";

// This class mirrors ZodIssue
// https://zod.dev/ERROR_HANDLING?id=zodissue
export class ErrorIssueDTO
{
    message: string;

    code: ZodIssueCode;

    path: string[];

    constructor({ message: message, path: path = [] }: Omit<ErrorIssueDTO, "code">)
    {
        this.message = message;
        this.path = path;
        this.code = ZodIssueCode.custom;
    }
}