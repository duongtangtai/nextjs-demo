import users from '@/BE/data/users.json';

type GetUsersProps = { 
    id: string, 
    ofc_cd: string 
}

export const UserRepo = {
    getUsers: (props: GetUsersProps) => handleGetUsers(props),
}

const handleGetUsers = ({id, ofc_cd}: GetUsersProps): ResponseDTO => {
    const userData = users.filter(user => user.id.toString().includes(id))
        .filter(user => user.ofc_cd.includes(ofc_cd))
        .map(user => {
            const {email, password, cre_dt, cre_usr, ...rest} = user
            return rest;
        });

    return {
        content: userData,
        errors: [],
        hasErrors: false,
        statusCode: 200,
        timeStamp: new Date().toISOString(),
    }
}

export default UserRepo;