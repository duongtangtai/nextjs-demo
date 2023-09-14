import fs from 'fs';
import users from '@/BE/data/users.json';
import { formattedDate } from '@/lib/utils';

export const AuthRepo = {
    login: (userInfo: Pick<UserInfo, "email" | "password">) => handleLogin(userInfo),
    register: (userInfo: Pick<UserInfo, "email" | "password" | "username">) => handleRegister(userInfo),
}


const handleLogin = (userInfo: Pick<UserInfo, "email" | "password">): ResponseDTO => {
    //check users
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === userInfo.email && users[i].password === userInfo.password) {
            return {
                content: {
                    ...users[i]
                },
                errors: [],
                hasErrors: false,
                statusCode: 200,
                timeStamp: new Date().toISOString()
            };
        }
    }
    return {
        content: "",
        errors: [],
        hasErrors: false,
        statusCode: 401,
        timeStamp: new Date().toISOString()
    };
}

const handleRegister = (newUserInfo: Pick<UserInfo, "email" | "password" | "username">): ResponseDTO => {
    //check users 
    const isDuplicated = users.map(user => user.email).includes(newUserInfo.email)

    if (!isDuplicated) {
        const userInfo = createUser(newUserInfo)
        return {
            content: userInfo,
            errors: [],
            hasErrors: false,
            statusCode: 200,
            timeStamp: new Date().toISOString()
        }

    }
    return {
        content: "",
        errors: [],
        hasErrors: false,
        statusCode: 400,
        timeStamp: new Date().toISOString()
    }
}

const createUser = (newUserInfo: Pick<UserInfo, "email" | "password" | "username">): UserInfo => {
    //generate newId
    const newId: number = users.length ? Math.max(...users.map(x => parseInt(x.id))) + 1 : 1;
    const newUser: UserInfo = {
        id: String(newId),
        ...newUserInfo,
        ofc_cd: "SINHO",
        cnt_cd: "VN",
        acc_sts: "active",
        upd_usr: newUserInfo.username,
        upd_dt: formattedDate(new Date()),
        cre_usr: newUserInfo.username,
        cre_dt: formattedDate(new Date()),
    }
    users.push(newUser)
    saveData();
    return newUser
}

const saveData = async () => {
    fs.writeFileSync(`${process.cwd()}\\BE\\data\\users.json`, JSON.stringify(users))
}