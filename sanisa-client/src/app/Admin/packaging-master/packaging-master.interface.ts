export interface CreatePackagingDTO {
    pCode: string,
    pName: string,
    pDesc: string,
    actionUser: string
}


export interface UpdatePackagingDTO {
    packagingId: number,
    pCode: string,
    pName: string,
    pDesc: string,
    isActive: number,
    actionUser: string
}


export interface DeletePackagingDTO {
    packagingId: number,
    actionUser: string
}

export interface PackagingReadAllPaginatedDTO {
    rowNum: number,
    totalCount: number,
    whereClause: string,
    orderByClause: string,
    pageSize: number,
    pageNo: number
}


export interface PackagingDTO extends PackagingReadAllPaginatedDTO {
    packagingId: number,
    pCode: string,
    pName: string,
    pDesc: string,
    isActive: number,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date,
}

export interface PackagingList {
    items: PackagingDTO[]
}