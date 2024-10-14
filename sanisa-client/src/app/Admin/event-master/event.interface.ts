export interface CreateEventDTO {
    eventName: string,
    eventCode: string,
    eventDesc: string,
    companyId: number,
    actionUser: string
}
export interface DeleteEventDTO {
    eventId: number,
    actionUser: string
}
export interface UpdateEventDTO {
    eventId: number,
    eventName: string,
    eventCode: string,
    eventDesc: string,
    companyId: number,
    actionUser: string
    isActive: number
}
export interface EventMasterDTO {
    eventId: number,
    eventName: string,
    eventCode: string,
    eventDesc: string,
    companyId: number,
    isActive: number,
    isDeleted: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date,
    actionUser: string
}
export interface EventList {
    items: EventMasterDTO[]
}