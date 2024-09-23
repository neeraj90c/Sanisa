export interface CreateCategoryDetailDTO {
    categoryId: number,
    itemId: number,
    actionUser: string
}

export interface UpdateCategoryDetailDTO {
    detailId: number,
    categoryId: number,
    itemId: number,
    isActive: number,
    actionUser: string
}

export interface DeleteCategoryDetailDTO {
    detailId: number,
    actionUser: string
}

export interface CategoryDetailDTO {
    detailId: number,
    categoryId: number,
    itemId: number,
    isActive: number,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date
}

export interface CategoryDetailList {
    items: CategoryDetailDTO[]
}