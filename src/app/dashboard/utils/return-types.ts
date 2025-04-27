export type SuccessType<T> = { success: true; data: T }
export type FailureType = {
    success: false
    error: string
    cause: unknown
    msg: string
}

// export type Result = SuccessType | FailureType

export function Success<T>(data: T): SuccessType<T> {
    return { success: true, data }
}

export function Failure(
    error: string,
    cause: unknown,
    msg: string
): FailureType {
    return { success: false, error, cause, msg }
}
