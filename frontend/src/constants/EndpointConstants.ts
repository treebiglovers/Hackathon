export class EndpointConstants
{
    public static readonly HOST = "http://localhost:6969";
    public static readonly API = `${this.HOST}/api`;

    public static readonly AUTH = `${this.API}/auth`;
    public static readonly LOGIN = `${this.AUTH}/login`;

    public static readonly MEMBERS = `${this.API}/members`;
    public static readonly MEMBERS_ME = `${this.MEMBERS}/me`;

    public static readonly LISTINGS = `${this.API}/listings`;
    public static readonly GET_LISTINGS = this.LISTINGS;
}
