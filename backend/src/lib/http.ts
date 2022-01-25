export const enum HttpStatusCodes {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    MethodNotAllowed = 405,
}

export class HttpError extends Error {
    constructor(message: string, private __httpStatusCode: number) {
        super(message);
    }

    HttpStatusCode() {
        return this.__httpStatusCode;
    }
}

export function HttpNotFound(msg = 'not found') {
    return new HttpError(msg, HttpStatusCodes.NotFound);
}

export function HttpBadRequest(msg = 'bad input') {
    return new HttpError(msg, HttpStatusCodes.BadRequest);
}

export const HttpParamValidators = {
    MustBeNumber(obj: any, key: string) {
        const v: number = obj[key];
        if(!Number.isFinite(v)) {
            throw HttpBadRequest(`${key} must be number`);
        }
        return v;
    },
    MustBeString(obj: any, key: string, min = 1, max = 512) {
        const v = obj[key];
        if (typeof v !== 'string') {
            throw HttpBadRequest(`${key} must be string`);
        }
        if (v.length < min) {
            throw HttpBadRequest(`${key} must be at least ${min} characters`);
        }
        if (v.length > max) {
            throw HttpBadRequest(`${key} must be shorter than ${max} characters`);
        }
        return v;
    },
    MustBeOneOf<T>(obj: any, key: string, values: T[] = []): T {
        const value = obj[key];
        for (const v of values) {
            if (v === value) {
                return v;
            }
        }
        throw HttpBadRequest(`${key} must be one of ${values.join(',')}`);
    },
    MustBeArray(obj: any, key: string) {
        const v = obj[key];
        if(!Array.isArray(v)) {
            throw HttpBadRequest(`${key} must be array`);
        }
        if(v.length < 1) {
            throw HttpBadRequest(`${key} must have a great length of 1`);
        }
        return v;
    }
}