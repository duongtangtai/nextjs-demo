type ResponseDTO = {
    content: object | string,
    hasErrors: boolean,
    errors: string[],
    timeStamp: string,
    statusCode: number,
}
// LOGIN
type LoginDto = {
    email: string;
    password: string;
    expires: string;
}


type UserInfo = {
    id: string,
    email: string,
    username: string,
}

type RegisterForm = {
    email: string,
    username: string,
    password: string,
    password2: string,
  }

type MailInfo = {
    subject: string,
    toEmail: string,
    text: string,
}

type MailResult = {
    isSuccessful: boolean,
    errMsg: string,
}

type TableHeaderConfig = {
    id: string,
    displayName: string,
    isSortable?: boolean,
    width?: string,
    sortDirection?: "asc" | "desc"
}