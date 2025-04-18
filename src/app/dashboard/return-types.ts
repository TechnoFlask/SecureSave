type SuccessType = { success: true; data?: any }
type FailureType = { success: false; cause: string }

export type Result = SuccessType | FailureType

export function Success(data?: unknown): SuccessType {
    return { success: true, data }
}

export function Failure(cause: string): FailureType {
    return { success: false, cause }
}
