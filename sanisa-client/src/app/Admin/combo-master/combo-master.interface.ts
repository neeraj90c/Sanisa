export interface CreateComboDTO {
    cCode: string,
    cName: string,
    cDescription: string,
    creationType: string,
    actionUser: string
}

export interface UpdateComboDTO {
    comboId: number,
    cCode: string,
    cName: string,
    cDescription: string,
    creationType: string,
    isActive: number,
    actionUser: string
}

export interface DeleteComboDTO {
    comboId: number,
    actionUser: string
}

export interface ComboMasterDTO {
    comboId: number,
    cCode: string,
    cName: string,
    cDescription: string,
    creationType: string,
    isActive: number,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: number,
    modifiedOn: Date,
    pageNo: number,
    pageSize: number,
    rowNum: number,
    totalCount: number,
    whereClause: string,
    orderByClause: string

}

export interface ComboList {
    items: ComboMasterDTO[]
}

export interface ReadAllComboPaginatedDTO {
    rowNum: number,
    totalCount: number,
    whereClause: string,
    orderByClause: string,
    pageSize: number,
    pageNo: number
}