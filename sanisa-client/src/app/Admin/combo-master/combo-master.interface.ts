import { ReadAllDTO } from "src/app/Common/common.interface"

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

export interface ComboMasterDTO extends ReadAllDTO {
    comboId: number,
    cCode: string,
    cName: string,
    cDescription: string,
    creationType: string,
    itemCount: number,
    isActive: number,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: number,
    modifiedOn: Date

}

export interface ComboList {
    items: ComboMasterDTO[]
}

