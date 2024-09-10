export interface BrandMasterDTO {
    brandId: number
    bCode: string;
    bName: string;
    bDesc: string;
    companyId: number;
    isActive: number;
    isDeleted: number;
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
}

export interface BrandList {
    items: BrandMasterDTO[]
}

export interface ReadAllBrandsPaginatedDTO {
    rowNum: number,
    totalCount: number,
    whereClause: string,
    orderByClause: string,
    pageSize: number,
    pageNo: number
}

export interface CreateBrandDTO {
    bCode: string,
    bName: string,
    bDesc: string,
    actionUser: string,
    companyId: number
}

export interface UpdateBrandDTO {
    brandId: number,
    bCode: string,
    bName: string,
    bDesc: string,
    companyId: number,
    isActive: number,
    actionUser: string
}

export interface DeleteBrandDTO {
    brandId: number,
    actionUser: string
}