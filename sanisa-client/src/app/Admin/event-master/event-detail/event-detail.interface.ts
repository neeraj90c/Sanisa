export interface CreateEventDetailDTO {
    eventId: number,
    itemId: number,
    actionUser: string
}

export interface UpdateEventDetailDTO {
    eDetailId: number,
    eventId: number,
    itemId: number,
    isActive: number,
    actionUser: string
}

export interface DeleteEventDetailDTO {
    eDetailId: number,
    actionUser: string
}
export interface EventDetailDTO {
    eDetailId: number,
    eventId: number,
    itemId: number,
    isActive: number,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date
}
export interface EventDetailList {
    items: EventDetailDTO[]
}