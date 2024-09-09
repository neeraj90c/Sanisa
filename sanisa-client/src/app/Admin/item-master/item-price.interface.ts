export interface CreateItemPriceDTO {
    itemId: number,
    mrp: number,
    iP1: number,
    iP2: number,
    iP3: number,
    cp: number,
    actionUser: string
}

export interface UpdateItemPriceDTO {
    priceId: number,
    itemId: number,
    mrp: number,
    iP1: number,
    iP2: number,
    iP3: number,
    cp: number,
    isActive: number,
    actionUser: string
}

export interface ReadItemPriceByIdDTO {
    priceId: number
}

export interface ReadItemPriceByItemIdDTO {
    itemId: number
}

export interface DeleteItemPriceDTO {
    priceId: number,
    actionUser: string
}

export interface ItemPriceDTO {
    priceId: number,
    itemId: number,
    mrp: number,
    iP1: number,
    iP2: number,
    iP3: number,
    cp: number,
    isActive: number,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date,
    pageNo: number,
    pageSize: number,
    rowNum: number,
    totalCount: number,
    whereClause: string | null,
    orderByClause: string | null
}

export interface ItemPriceList {
    items: ItemPriceDTO[]
}