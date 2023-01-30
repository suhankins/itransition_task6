export const NO_ACTION = JSON.stringify({
    result: 'error',
    data: 'No action specified!',
});

export const NAME_ALREADY_DEFINED = JSON.stringify({
    result: 'error',
    data: 'Name already defined',
});

export const UNKNOWN_ACTION = JSON.stringify({
    result: 'error',
    data: 'Unknown action',
});

export const UNAUTHORIZED = JSON.stringify({
    result: 'error',
    data: 'Unauthorized',
});

export function STRING_TOO_LONG(name: string) {
    return JSON.stringify({
        result: 'error',
        data: `${name} is too long`,
    });
}

export function STRING_TOO_SHORT(name: string) {
    return JSON.stringify({
        result: 'error',
        data: `${name} is too short`,
    });
}

export const SUCCESS = {
    result: 'success',
    data: undefined as any,
};
