export interface CreateKitDTO {
    kCode: string,
    kName: string,
    kDescription: string,
    actionUser: string
}


export interface UpdateKitDTO {
    kitId: number,
    kCode: string,
    kName: string,
    kDescription: string,
    isActive: number,
    actionUser: string
}

export interface DeleteKitDTO {
    kitId: number,
    actionUser: string
}

export interface ReadAllKitPaginatedDTO {
    rowNum: number,
    totalCount: number,
    whereClause: string,
    orderByClause: string,
    pageSize: number,
    pageNo: number
}

export interface KitMasterDTO extends ReadAllKitPaginatedDTO {
    kitId: number,
    kCode: string,
    kName: string,
    kDescription: string,
    isActive: number,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date
}

export interface KitList {
    items: KitMasterDTO[]
}