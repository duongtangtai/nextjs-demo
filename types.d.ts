type ResponseDTO = {
    content: object | string,
    hasErrors: boolean,
    errors: string[],
    timeStamp: Date,
    statusCode: number,
}

type LoginResult = {
    isSuccessful: boolean,
    userInfo?: UserInfo
}

type RegisterResult = {
    isSuccessful: boolean,
    userInfo?: UserInfo
}

type UserInfo = {
    id: string,
    email: string,
    password: string,
    username: string,
    ofc_cd: string,
    cnt_cd: string,
    acc_sts: "active" | "blocked",
    upd_usr: string,
    upd_dt: string,
    cre_usr: string,
    cre_dt: string
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