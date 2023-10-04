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
    roles: string,
}

type RoleInfo = {
    key: number,
    id: string,
    name: string,
    description: string,
    permissionNames: string[]
}

type PermissionInfo = {
    id: string,
    name: string,
    description: string,
}

type VesselInfo = {
    key: number;
    vslCd: string,
    vslEngNm: string,
    callSgnNo: string,
    crrCr: string,
    fdrDivCd: string,
    lloydNo: string,
    netRgstTongWgt: number,
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

type ToastObject = {
    notify: (options: Omit<ToastData, "id", "onClick">) => void;
};

type ToastData = {
    id: string;
    type: "success" | "error" | "warning" | "info";
    message: string;
    close: Function
};

type Input = {
    id: string;
    name: string;
    type: "text" | "email" | "number" | "password";
    description: string,
    placeHolder: string;
    isRequired?: boolean;
};