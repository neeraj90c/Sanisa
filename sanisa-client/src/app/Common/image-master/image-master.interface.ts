import { ReadAllDTO } from "../common.interface"

export interface CreateImageDTO {
    masterId: number,
    masterType: number,
    iName: string,
    iType: string,
    iurl: string,
    actionUser: string,
    isDefault: number
}


export interface UpdateImageDTO {
    imageId: number,
    masterId: number,
    masterType: number,
    iName: string,
    iType: string,
    iurl: string,
    isDefault: number,
    isActive: number,
    actionUser: string
}

export interface ReadByMasterIdDTO {
    masterId: number,
    masterType: number
}

export interface DeleteImageDTO {
    imageId: number,
    actionUser: string
}

export interface ImageMasterDTO extends ReadAllDTO {
    imageId: number,
    masterId: number,
    masterType: number,
    iName: string,
    iType: string,
    iurl: string,
    isDefault: number,
    isActive: number,
    actionUser: string
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date,
}

export interface ImageListDTO {
    items: ImageMasterDTO[]
}

