export interface userInfo {
    _id?: string;
    name?: string;
    email?: string;
    profileImg?: string;
}

export interface UpdateUserData {
    name: string;
    email: string;
    currentPass?: string;
    newPass?: string;
    confirmPass?: string;
    profileImg?: string;
}



export interface UserLogin {
    email: string;
    password: string;
}