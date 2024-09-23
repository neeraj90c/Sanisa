export interface CreateRoleDTO {
    projectId: number,
    roleName: string,
    roleCode: string,
    roleDesc: string,
    actionUser: string
}

export interface UpdateRoleDTO {
    roleId: number,
    projectId: number,
    roleName: string,
    roleCode: string,
    roleDesc: string,
    isActive: number,
    actionUser: string
}

export interface DeleteRoleDTO {
    roleId: number,
    actionUser: string
}

export interface RoleMasterDTO {
    roleId: number,
    projectId: number,
    roleName: string,
    roleCode: string,
    roleDesc: string,
    isActive: number,
    createdBy: string,
    createdOn: Date,
    modifiedBy: string,
    modifiedOn: Date,
    isDeleted: number
}

export interface RoleListDTO {
    items: RoleMasterDTO[]
}
