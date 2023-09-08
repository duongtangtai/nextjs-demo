const API_ROOT = "http://localhost:3000";
export const API_AUTH_LOGIN = `${API_ROOT}/api/auth/login`
export const API_AUTH_REGISTER = `${API_ROOT}/api/auth/register`
export const API_MAIL = `${API_ROOT}/api/mail`
export const API_USERS = `${API_ROOT}/api/users`

export const formattedDate = (date: Date): string => {
    return date.toISOString().split('T')[0]
}