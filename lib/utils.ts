const API_ROOT = "http://localhost:3000";
export const API_AUTH_LOGIN = `${API_ROOT}/api/auth/login`
export const API_AUTH_LOGOUT = `${API_ROOT}/api/auth/logout`
export const API_AUTH_REGISTER = `${API_ROOT}/api/auth/register`
export const API_MAIL = `${API_ROOT}/api/mail`
export const API_USERS = `${API_ROOT}/api/users`
export const API_USERS_CHANGE_PASSWORD = `${API_ROOT}/api/users/change-password`
export const API_ROLES = `${API_ROOT}/api/roles`
export const API_PERMISSIONS = `${API_ROOT}/api/permissions`

const BE_ROOT = "http://localhost:3001";
export const BE_AUTH_LOGIN = `${BE_ROOT}/auth/login`
export const BE_AUTH_REGISTER = `${BE_ROOT}/auth/register`
export const BE_AUTH_REFRESH_TOKEN =  `${BE_ROOT}/auth/refresh-token`
export const BE_USER = `${BE_ROOT}/users`
export const BE_USER_ADD_ROLES = `${BE_USER}/add-roles`
export const BE_USER_CHANGE_PASSWORD = `${BE_USER}/change-password`
export const BE_ROLE = `${BE_ROOT}/roles`
export const BE_PERMISSIONS = `${BE_ROOT}/permissions`

export const ROLE_ADMIN = "ADM"
export const ROLE_MANAGER = "MNG"
export const ROLE_EMPLOYEE = "EMP"

export const formattedDate = (date: Date): string => {
    return date.toISOString().split('T')[0]
}