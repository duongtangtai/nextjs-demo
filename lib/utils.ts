const API_ROOT = "http://localhost:3000";
export const API_AUTH_LOGIN = `${API_ROOT}/api/auth/login`
export const API_AUTH_REGISTER = `${API_ROOT}/api/auth/register`
export const API_MAIL = `${API_ROOT}/api/mail`
export const API_USERS = `${API_ROOT}/api/users`

const BE_ROOT = "http://localhost:3001";
export const BE_AUTH_LOGIN = `${BE_ROOT}/auth/login`
export const BE_AUTH_REGISTER = `${BE_ROOT}/auth/register`
export const BE_AUTH_REFRESH_TOKEN =  `${BE_ROOT}/auth/refresh-token`
export const BE_USER = `${BE_ROOT}/users`

export const formattedDate = (date: Date): string => {
    return date.toISOString().split('T')[0]
}