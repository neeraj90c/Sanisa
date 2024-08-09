export interface ParentMenu {
    userId: number;
    roleId: number;
    menuId: number;
    parentMenuId: number;
    subRoleId: number;
    subRoleName: string;
    subRoleCode: string;
    subRoleDesc: string;
    displayOrder: number;
    defaultChildMenuId: number;
    menuIconUrl: string;
    templatePath: string;
    isParent: number;
    childrenCount: number;
    childIsParent: number;
    childMenuList?: ParentMenu[];
    projectId: number
}

export interface MenuDataItem {
    items: ParentMenu[];
}