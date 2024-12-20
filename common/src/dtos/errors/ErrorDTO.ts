import { ErrorIssueDTO } from "./ErrorIssueDTO";
import { ZodError, ZodIssue } from "zod";

export class ErrorDTO
{
    errors: ErrorIssueDTO[] | ZodIssue[];

    constructor(errors: ErrorIssueDTO[] | ZodIssue[])
    {
        this.errors = errors;
    }

    static fromCustom(errorMessage: string, path: string[] = []): ErrorDTO
    {
        return new ErrorDTO([ new ErrorIssueDTO({ message: errorMessage, path: path }) ]);
    }

    static fromZodError(zodError: ZodError): ErrorDTO
    {
        return new ErrorDTO(zodError.errors);
    }
}