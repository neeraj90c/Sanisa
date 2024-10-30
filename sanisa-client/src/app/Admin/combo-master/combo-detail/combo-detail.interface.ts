export interface CreateComboDetailDTO{
    comboId:number
    itemType: number,
    itemId: number,
    remarks: string,
    actionUser: string
}
export interface UpdateComboDetailDTO{
    detailId: number,
    comboId: number,
    itemType: number,
    itemId: number,
    remarks: string,
    isActive: number,
    actionUser: string
}
export interface DeleteComboDetailDTO{
    detailId: number,
    actionUser: string
}
export interface ComboDetailsDTO {
    detailId: number,
    comboId: number,
    itemType: number,
    itemId: number,
    remarks: string,
    isActive: number,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date,
}
export interface ComboItemList{
    items: ComboDetailsDTO[]
}