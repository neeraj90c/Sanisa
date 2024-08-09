'use strict';

import { environment } from "src/environments/environment";
const BaseURL: string = environment.apiURL;
const Auth_BaseURL: string = BaseURL + '/auth/';
const Menu_BaseURL: string = BaseURL + '/menus/';
const UnifiedAuth_BaseURL: string = BaseURL + '/UA/'
const UserMaster_BaseURL: string = UnifiedAuth_BaseURL + 'UM/'
const CompanyMaster_BaseURL: string = UnifiedAuth_BaseURL + 'CM/'
const BankMaster_BaseURL: string = UnifiedAuth_BaseURL + 'BM/'


//#region Authentication API
export const Auth = Auth_BaseURL + 'auth'
export const ValidateToken = Auth_BaseURL + 'ValidateToken'
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