'use strict';

import { environment } from "src/environments/environment";
const BaseURL: string = environment.apiURL; //https://dev.sanisa.vnccy.com
const APIGateWay: string = BaseURL + '/apig/'; //https://dev.sanisa.vnccy.com/apig/

const Menu_BaseURL: string = BaseURL + '/menus/';

const UnifiedAuth_BaseURL: string = APIGateWay + 'UA/'  //https://dev.sanisa.vnccy.com/apig/UA


//#region Master URLs
const UserMaster_BaseURL: string = UnifiedAuth_BaseURL + 'UM/'
const CompanyMaster_BaseURL: string = UnifiedAuth_BaseURL + 'CM/'
const BankMaster_BaseURL: string = UnifiedAuth_BaseURL + 'BM/'
const UserLogin_BaseURL: string = UnifiedAuth_BaseURL + 'UL/'
//#endregion


//#region Authentication API
export const Auth = UserLogin_BaseURL + 'auth'
export const ValidateToken = UserLogin_BaseURL + 'ValidateToken'
//#endregion

//#region Menu API
export const GetMenuForUser = Menu_BaseURL + 'GetMenuForUser'
//#endregion

//#region UserMaster API
export const ReadAllUsers = UserMaster_BaseURL + 'ReadAll'
export const ReadAllUsersPaginated = UserMaster_BaseURL + 'ReadAllPaginated'
export const CreateUser = UserMaster_BaseURL + 'Create'
export const UpdateUserById = UserMaster_BaseURL + 'Update'
export const UpdateUserStatus = UserMaster_BaseURL + 'UpdateStatus'
export const ReadUserById = UserMaster_BaseURL + 'ReadById'
export const DeleteUserById = UserMaster_BaseURL + 'Delete'
//#endregion


//#region CompanyMaster API
export const ReadAllCompany = CompanyMaster_BaseURL + 'ReadAll'
//#endregion


//#region BankMaster API
export const ReadAllBanks = BankMaster_BaseURL + 'ReadAll'
export const ReadAllBanksPaginated = BankMaster_BaseURL + 'ReadAllPaginated'
export const CreateBank = BankMaster_BaseURL + 'Create'
export const UpdateBank = BankMaster_BaseURL + 'Update'
export const ReadBankById = BankMaster_BaseURL + 'ReadById'
export const DeleteBank = BankMaster_BaseURL + 'Delete'
//#endregion