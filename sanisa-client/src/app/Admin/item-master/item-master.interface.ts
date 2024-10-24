export interface CreateItemDTO {
    iCode: string;
    iName: string;
    iDesc: string;
    iType: string;
    packingId: number;
    iSize: string;
    mrpPrinted: string;
    moq: number;
    brandId: number;
    actionUser: string;
}

export interface UpdateItemDTO {
    itemId: number,
    iCode: string,
    iName: string,
    iDesc: string,
    iType: string,
    packingId: number,
    iSize: string,
    mrpPrinted: string,
    moq: number,
    brandId: number,
    isActive: number,
    actionUser: string
}

export interface DeleteItemDTO {
    itemId: number,
    actionUser: string
}

export interface ReadAllItemsPaginatedDTO {
    rowNum: number,
    totalCount: number,
    whereClause: string,
    orderByClause: string,
    pageSize: number,
    pageNo: number
}

export interface ItemMaster {
    itemId: number,
    iCode: string,
    iName: string,
    iDesc: string,
    iType: string,
    packingId: number,
    iSize: string,
    mrpPrinted: string,
    moq: number,
    brandId: number,
    isActive: number,
    isDeleted: number,
    createdBy: string;
    createdOn: string;
    modifiedBy: string | null;
    modifiedOn: string;
    pageNo: number;
    pageSize: number;
    rowNum: number;
    totalCount: number;
    whereClause: string | null;
    orderByClause: string | null;
    imagePath: string;
    mrp: number,
    bName:string;
    detailId:number
}

export interface ItemList {
    items: ItemMaster[]
}
