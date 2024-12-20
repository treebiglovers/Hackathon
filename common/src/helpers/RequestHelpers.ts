export const constructGET = (): RequestInit =>
{
    return {
        method: "GET",
        headers: new Headers(),
    };
}


export const constructDELETE = (): RequestInit =>
{
    return {
        method: "DELETE",
        headers: new Headers(),
    };
}

const constructJSONCore = <T>(payload?: T | undefined): RequestInit =>
{
    const PAYLOAD_DEFINED = payload != undefined;

    const headers = new Headers();

    if (PAYLOAD_DEFINED)
    {
        headers.append("Content-Type", "application/json");
    }

    return {
        headers: headers,
        body: PAYLOAD_DEFINED ? JSON.stringify(payload) : undefined,
    };
}

export const constructPOST = <T>(payload?: T | undefined): RequestInit =>
{
    const init = constructJSONCore(payload);

    init.method = "POST";

    return init
}

export const constructPUT = <T>(payload?: T | undefined): RequestInit =>
{
    const init = constructJSONCore(payload);

    init.method = "PUT";

    return init
}

export const appendJSONContent = <T>(requestInit: RequestInit, object: T): RequestInit =>
{
    (requestInit.headers as Headers).append("Content-Type", "application/json");

    requestInit.body = JSON.stringify(object);

    return requestInit;
}