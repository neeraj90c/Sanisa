'use strict';

import { environment } from "src/environments/environment";
export const BaseURL: string = environment.apiURL; //https://dev.sanisa.vnccy.com
export const APIGateWay: string = BaseURL + '/apig/'; //https://dev.sanisa.vnccy.com/apig/
export const BaseImageURL: string = BaseURL + '/Images/'

const Menu_BaseURL: string = BaseURL + '/menus/';

const UnifiedAuth_BaseURL: string = APIGateWay + 'UA/'  //https://dev.sanisa.vnccy.com/apig/UA
const UnifiedRole_BaseURL: string = APIGateWay + 'UR/'  //https://dev.sanisa.vnccy.com/apig/UA

const Sanisa_BaseURL: string = APIGateWay + 'SA/' //https://dev.sanisa.vnccy.com/apig/SA

//#region Master URLs
const UserMaster_BaseURL: string = UnifiedAuth_BaseURL + 'UM/'
const CompanyMaster_BaseURL: string = UnifiedAuth_BaseURL + 'CM/'
const BankMaster_BaseURL: string = UnifiedAuth_BaseURL + 'BM/'
const UserLogin_BaseURL: string = UnifiedAuth_BaseURL + 'UL/'
const RoleMaster_BaseURL: string = UnifiedRole_BaseURL + 'R/'
const BrandMaster_BaseURL: string = Sanisa_BaseURL + 'BRM/'
const ItemMaster_BaseURL: string = Sanisa_BaseURL + 'ITM/'
const ItemPrice_BaseURL: string = Sanisa_BaseURL + 'ITPR/'
const KitMaster_BaseURL: string = Sanisa_BaseURL + 'KITM/'
const KitDetail_BaseURL: string = Sanisa_BaseURL + 'KITD/'
const ProductComboMaster_BaseURL: string = Sanisa_BaseURL + 'PRCO/'
const ComboDetail_BaseURL: string = Sanisa_BaseURL + 'CODT/'
const PackagingMaster_BaseURL: string = Sanisa_BaseURL + 'PCM/'
const QuoteMaster_BaseURL: string = Sanisa_BaseURL + 'QUMT/'
const CategoryMaster_BaseURL: string = Sanisa_BaseURL + 'CTM/'
const CategoryDetail_BaseURL: string = Sanisa_BaseURL + 'CTD/'
const EventMaster_BaseURL: string = Sanisa_BaseURL + 'EVTM/'
const EventDetail_BaseURL: string = Sanisa_BaseURL + 'EVTD/'
const ImageMaster_BaseURL: string = Sanisa_BaseURL + 'IMGM/'



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

//#region RoleMaster API
export const CreateRole = RoleMaster_BaseURL + 'Create'
export const UpdateRole = RoleMaster_BaseURL + 'Update'
export const DeleteRole = RoleMaster_BaseURL + 'Delete'
export const GetDictionaryRole = RoleMaster_BaseURL + 'GetDictionary'
export const ReadAllPaginatedRole = RoleMaster_BaseURL + 'ReadAllPaginated'
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
export const ReadItemByKitId = ItemMaster_BaseURL + 'ReadByKitId'
export const ReadItemByComboId= ItemMaster_BaseURL + 'ReadByComboId'
export const DeleteItem = ItemMaster_BaseURL + 'Delete'
export const SearchItemByName = ItemMaster_BaseURL + 'SearchByName'
export const ReadByCategoryId = ItemMaster_BaseURL + 'ReadByCategoryId'
export const ReadByEventId = ItemMaster_BaseURL + 'ReadByEventId'
//#endregion


//#region Item Price API
export const ReadAllItemPrices = ItemPrice_BaseURL + 'ReadAll'
export const CreateItemPrice = ItemPrice_BaseURL + 'Create'
export const UpdateItemPrice = ItemPrice_BaseURL + 'Update'
export const ReadPriceByPriceId = ItemPrice_BaseURL + 'ReadById'
export const ReadPriceByItemId = ItemPrice_BaseURL + 'ReadByItemId'
export const DeleteItemPrice = ItemPrice_BaseURL + 'Delete'
//#endregion


//#region KitMaster Master API
export const CreateKit = KitMaster_BaseURL + 'Create'
export const UpdateKit = KitMaster_BaseURL + 'Update'
export const ReadKitByKitId = KitMaster_BaseURL + 'ReadById'
export const DeleteKit = KitMaster_BaseURL + 'Delete'
export const ReadAllKit = KitMaster_BaseURL + 'ReadAll'
export const ReadAllKitPaginated = KitMaster_BaseURL + 'ReadAllPaginated'
//#endregion


//#region KitDetail API
export const CreateKitDetail = KitDetail_BaseURL + 'Create'
export const UpdateKitDetail = KitDetail_BaseURL + 'Update'
export const ReadKitByDetailId = KitDetail_BaseURL + 'ReadById'
export const ReadDetailsByKitId = KitDetail_BaseURL + 'ReadByKitId'
export const DeleteKitDetail = KitDetail_BaseURL + 'Delete'
export const ReadAllKitDetails = KitDetail_BaseURL + 'ReadAll'
//#endregion


//#region ProductCombo Master API ProductComboMaster_BaseURL
export const CreateProductCombo = ProductComboMaster_BaseURL + 'Create'
export const UpdateProductCombo = ProductComboMaster_BaseURL + 'Update'
export const ReadComboByComboId = ProductComboMaster_BaseURL + 'ReadById'
export const DeleteProductCombo = ProductComboMaster_BaseURL + 'Delete'
export const ReadAllProductCombos = ProductComboMaster_BaseURL + 'ReadAll'
export const ReadAllProductCombosPaginated = ProductComboMaster_BaseURL + 'ReadAllPaginated'
//#endregion

//#region ComboDetail API
export const CreateComboDetail = ComboDetail_BaseURL + 'Create'
export const UpdateComboDetail = ComboDetail_BaseURL + 'Update'
export const DeleteComboDetail = ComboDetail_BaseURL + 'Delete'
export const ReadComboDetailByDetailId = ComboDetail_BaseURL + 'ReadByDetailId'
export const ReadDetailsByComboId = ComboDetail_BaseURL + 'ReadByComboId'
export const ReadAllComboDetails = ComboDetail_BaseURL + 'ReadAll'
//#endregion


//#region Packaging Master API PackagingMaster_BaseURL
export const CreatePackaging = PackagingMaster_BaseURL + 'Create'
export const UpdatePackaging = PackagingMaster_BaseURL + 'Update'
export const ReadPackagingById = PackagingMaster_BaseURL + 'ReadById'
export const DeletePackaging = PackagingMaster_BaseURL + 'Delete'
export const ReadAllPackagings = PackagingMaster_BaseURL + 'ReadAll'
export const ReadAllPackagingsPaginated = PackagingMaster_BaseURL + 'ReadAllPaginated'
//#endregion


//#region Quote Master API QuoteMaster_BaseURL
export const CreateQuote = QuoteMaster_BaseURL + 'Create'
export const UpdateQuote = QuoteMaster_BaseURL + 'Update'
export const ReadQuoteById = QuoteMaster_BaseURL + 'ReadById'
export const DeleteQuote = QuoteMaster_BaseURL + 'Delete'
export const ReadAllQuotes = QuoteMaster_BaseURL + 'ReadAll'
export const ReadAllQuotesPaginated = QuoteMaster_BaseURL + 'ReadAllPaginated'
export const QuoteSuggestions = QuoteMaster_BaseURL + 'Suggestions'
//#endregion

//#region Category Master API CategoryMaster_BaseURL
export const CreateCategory = CategoryMaster_BaseURL + 'Create'
export const UpdateCategory = CategoryMaster_BaseURL + 'Update'
export const ReadCategoryById = CategoryMaster_BaseURL + 'ReadById'
export const DeleteCategory = CategoryMaster_BaseURL + 'Delete'
export const ReadAllCategory = CategoryMaster_BaseURL + 'ReadAll'
//#endregion

//#region Category Detail API CategoryDetail_BaseURL
export const CreateCategoryDetail = CategoryDetail_BaseURL + 'Create'
export const UpdateCategoryDetail = CategoryDetail_BaseURL + 'Update'
export const ReadCategoryDetailById = CategoryDetail_BaseURL + 'ReadById'
export const ReadDetailByCategoryId = CategoryDetail_BaseURL + 'ReadByCategoryId'
export const DeleteCategoryDetail = CategoryDetail_BaseURL + 'Delete'
export const ReadAllCategoryDetail = CategoryDetail_BaseURL + 'ReadAll'
export const ReadCategoryDetailByItemId = CategoryDetail_BaseURL + 'ReadByItemId'

//#endregion


//#region Event Master API EventMaster_BaseURL
export const CreateEvent = EventMaster_BaseURL + 'Create'
export const UpdateEvent = EventMaster_BaseURL + 'Update'
export const ReadEventById = EventMaster_BaseURL + 'ReadById'
export const DeleteEvent = EventMaster_BaseURL + 'Delete'
export const ReadAllEvent = EventMaster_BaseURL + 'ReadAll'
//#endregion


//#region Event Detail API EventDetail_BaseURL
export const CreateEventDetail = EventDetail_BaseURL + 'Create'
export const UpdateEventDetail = EventDetail_BaseURL + 'Update'
export const ReadEventDetailById = EventDetail_BaseURL + 'ReadById'
export const DeleteEventDetail = EventDetail_BaseURL + 'Delete'
export const ReadAllEventDetail = EventDetail_BaseURL + 'ReadAll'
export const ReadDetailByEventId = EventDetail_BaseURL + 'ReadByEventId'
export const ReadDetailByItemId = EventDetail_BaseURL + 'ReadByItemId'
//#endregion

//#region Image Master API ImageMaster_BaseURL
export const CreateImage = ImageMaster_BaseURL + 'Create'
export const UpdateImage = ImageMaster_BaseURL + 'Update'
export const ReadImageById = ImageMaster_BaseURL + 'ReadById'
export const ReadImageByMasterId = ImageMaster_BaseURL + 'ReadByMasterId'
export const DeleteImage = ImageMaster_BaseURL + 'Delete'
export const ReadAllImage = ImageMaster_BaseURL + 'ReadAll'
//#endregion
