export interface CreateUserLoginDTO {
    userId: number,
    userName: string,
    userPassword: string,
    actionUser: string
}

export interface UpdateUserLoginDTO {
    loginId: number,
    userId: number,
    userName: string,
    userPassword: string,
    isActive: number,
    actionUser: string
}

export interface userloginresponse {
    loginId: number,
    userId: number,
    userName: string,
    userPassword: string,
    failedLoginAttempt: number,
    lastLoggedDate: Date,
    isActive: number,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date
}

export interface ValidateUserNameResponse {
    responseMsg: string,
    responseCode: number
}