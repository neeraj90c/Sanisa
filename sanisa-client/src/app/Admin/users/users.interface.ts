export interface UserMaster {
    userId: number;
    companyId: number;
    firstName: string;
    middleName?: string ;
    lastName: string;
    dob: Date;
    mobileNo: string;
    emailId: string;
    designation: string;
    isActive: number;
    createdBy: string;
    createdOn: string;
    modifiedBy: string;
    modifiedOn: string;
    isDeleted: number;
    profileImage: string;
    actionUser: string | null;
    pageNo: number;
    pageSize: number;
    rowNum: number;
    totalCount: number;
    whereClause: string | null;
    orderByClause: string | null;
}


export interface UserList {
    items: UserMaster[]
}

export interface ReadAllPaginated {
    projectId: number,
    companyId: number,
    pageSize: number,
    pageNo: number
}

export interface CreateUserDTO {
    companyId: number,
    firstName: string,
    middleName?: string,
    lastName: string,
    dob: Date,
    mobileNo: string,
    emailId: string,
    designation?: string,
    profileImage?: string,
    actionUser: string
}

export interface UpdateUserDTO {
    userId: number,
    companyId: number,
    firstName: string,
    middleName?: string,
    lastName: string,
    dob: Date,
    mobileNo: string,
    emailId: string,
    designation?: string,
    isActive: number,
    profileImage?: string,
    actionUser: string
}

export interface UpdateUserStatusDTO {
    userId: number,
    isActive: number,
    actionUser: string
}