export interface DictionaryDTO {
    key: string,
    value: string
}

export interface DictionaryListDTO {
    dropDownList: DictionaryDTO[]
}

export interface ReadAllDTO {
    rowNum: number,
    totalCount: number,
    whereClause: string,
    orderByClause: string,
    pageSize: number,
    pageNo: number
    projectId?: number
}

