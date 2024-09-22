export interface CreateCategoryDTO {
    cCode: string,
    cName: string,
    cDesc: string,
    companyId: number,
    actionUser: string
}

export interface UpdateCategoryDTO {
    categoryId: number,
    cCode: string,
    cName: string,
    cDesc: string,
    companyId: number,
    isActive: number,
    actionUser: string
}

export interface DeleteCategoryDTO {
    categoryId: number,
    actionUser: string
}

export interface CategoryMasterDTO {
    categoryId: number,
    cCode: string,
    cName: string,
    cDesc: string,
    companyId: number,
    isActive: number,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date
}

export interface CategoryList {
    items: CategoryMasterDTO[]
}