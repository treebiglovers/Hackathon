export class LoginResponseDTO
{
    token: string;

    constructor(token: string)
    {
        this.token = token;
    }
}