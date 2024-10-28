import { ReadAllDTO } from "src/app/Common/common.interface"

export interface CreateKitDetailDTO {
    kitId: number,
    itemId: number,
    remarks: string,
    actionUser: string
}
export interface UpdateKitDetailDTO {
    detailId: number,
    kitId: number,
    itemId: number,
    remarks: string,
    isActive: number,
    actionUser: string
}
export interface DeleteKitDetailDTO {
    detailId: number,
    actionUser: string
}
export interface KitDetailsDTO extends ReadAllDTO {
    detailId: number,
    kitId: number,
    itemId: number,
    remarks: string,
    isActive: number,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date,
}
export interface KitItemList {
    items: KitDetailsDTO[]
}