export interface CreateQuoteDTO {
    qName: string,
    qCode: string,
    qDesc: string,
    qStatus: string,
    qDate: Date,
    qRange: number,
    qMod: number,
    clientId: number,
    actionUser: string
}

export interface UpdateQuoteDTO {
    quotId: number,
    qName: string,
    qCode: string,
    qDesc: string,
    qDate: Date,
    qRange: number,
    qMod: number,
    clientId: number,
    qStatus: string,
    isActive: number,
    actionUser: string
}

export interface DeleteQuoteDTO {
    quotId: number,
    actionUser: string
}

export interface QuoteMasterDTO {
    quotId: number,
    qName: string,
    qCode: string,
    qDesc: string,
    qStatus: string,
    qDate: Date,
    qRange: number,
    qMod: number,
    clientId: number,
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
    whereClause: string,
    orderByClause: string
}

export interface QuoteListDTO {
    items: QuoteMasterDTO[]
}
export interface QuoteSuggestionsReq {
    budgetPrice: number;
    eventId: number;
    numberOfItems: number;
    numberOfSuggestions: number;
}
export interface QuoteMasterSuggestionsResponse {
    sugId: number;
    ttId: number;
    itemId: number;
    iName: string;
    iDesc: string;
    moq: number;
    mrp: number;
}

export interface QuoteSuggestionList {
    items: QuoteMasterSuggestionsResponse[];
}
