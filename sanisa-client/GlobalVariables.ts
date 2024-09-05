'use strict';

import { environment } from "src/environments/environment";
const BaseURL: string = environment.apiURL; //https://dev.sanisa.vnccy.com
const APIGateWay: string = BaseURL + '/apig/'; //https://dev.sanisa.vnccy.com/apig/

const Menu_BaseURL: string = BaseURL + '/menus/';

const UnifiedAuth_BaseURL: string = APIGateWay + 'UA/'  //https://dev.sanisa.vnccy.com/apig/UA

const Sanisa_BaseURL: string = APIGateWay + 'SA/'

//#region Master URLs
const UserMaster_BaseURL: string = UnifiedAuth_BaseURL + 'UM/'
const CompanyMaster_BaseURL: string = UnifiedAuth_BaseURL + 'CM/'
const BankMaster_BaseURL: string = UnifiedAuth_BaseURL + 'BM/'
const UserLogin_BaseURL: string = UnifiedAuth_BaseURL + 'UL/'
const BrandMaster_BaseURL: string = Sanisa_BaseURL + 'BRM/'
const ItemMaster_BaseURL: string = Sanisa_BaseURL + 'ITM/'
const ItemPrice_BaseURL: string = Sanisa_BaseURL + 'ITPR/'
//#endregion


//#region UserLogin API
export const CreateUserLogin = UserLogin_BaseURL + 'Create'
export const UpdateUserLogin = UserLogin_BaseURL + 'Update'
export const DeleteUserLogin = UserLogin_BaseURL + 'Delete'
export const ReadUserLoginByUserId = UserLogin_BaseURL + 'ReadByUserId'
export const ValidateUserName = UserLogin_BaseURL + 'ValidateUserName'
export const Auth = UserLogin_BaseURL + 'auth'
export const AzureAuth = UserLogin_BaseURL + 'AzureAuth'
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


//#region Brand Master API
export const ReadAllBrands = BrandMaster_BaseURL + 'ReadAll'
export const ReadAllBrandsPaginated = BrandMaster_BaseURL + 'ReadAllPaginated'
export const CreateBrand = BrandMaster_BaseURL + 'Create'
export const UpdateBrand = BrandMaster_BaseURL + 'Update'
export const ReadBrandById = BrandMaster_BaseURL + 'ReadById'
export const DeleteBrand = BrandMaster_BaseURL + 'Delete'
//#endregion


//#region Item Master API
export const ReadAllItems = ItemMaster_BaseURL + 'ReadAll'
export const ReadAllItemsPaginated = ItemMaster_BaseURL + 'ReadAllPaginated'
export const CreateItem = ItemMaster_BaseURL + 'Create'
export const UpdateItem = ItemMaster_BaseURL + 'Update'
export const ReadItemById = ItemMaster_BaseURL + 'ReadById'
export const DeleteItem = ItemMaster_BaseURL + 'Delete'
//#endregion


//#region Item Price API
export const ReadAllItemPrices = ItemPrice_BaseURL + 'ReadAll'
export const CreateItemPrice = ItemPrice_BaseURL + 'Create'
export const UpdateItemPrice = ItemPrice_BaseURL + 'Update'
export const ReadItemByPriceId = ItemPrice_BaseURL + 'ReadById'
export const DeleteItemPrice = ItemPrice_BaseURL + 'Delete'
//#endregion
