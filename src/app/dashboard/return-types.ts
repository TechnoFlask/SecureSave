type SuccessType = { success: true; data?: unknown }
type FailureType = { success: false; cause: string }

export type Result = SuccessType | FailureType

export function Success(data?: unknown): SuccessType {
    return { success: true, data }
}

export function Failure(cause: string): FailureType {
    return { success: false, cause }
}
