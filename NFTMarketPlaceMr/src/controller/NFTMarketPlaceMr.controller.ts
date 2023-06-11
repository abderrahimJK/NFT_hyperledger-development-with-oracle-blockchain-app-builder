/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */
import * as yup from "yup";
import { Validator } from "../../lib/decorators";
import { OchainController } from "../../lib/ochain-controller";
import { MoroccanArtCollections } from "../model/NFTMarketPlaceMr.model";
import { Context } from "../../lib/ochain-transaction-context";
import { OchainModel } from "../../lib/ochain-model";    
import { Filters } from "../../lib/erc721-token-account";
import { ERC721TokenAdminAsset } from "../../lib/erc721-token-admin";
import { OChainUtils } from '../../lib/utils';

export class NFTMarketPlaceMrController extends OchainController {
  private Ctx: Context;

  constructor(ctx: Context) {
    super(ctx.Stub);
    this.Ctx = ctx;
  }



     @Validator(yup.array().of(yup.object()).nullable())
     public async init(adminList: ERC721TokenAdminAsset[]) {
        await this.Ctx.ERC721Admin.initAdmin(adminList);
        await this.Ctx.ERC721Token.saveClassInfo(MoroccanArtCollections);
        await this.Ctx.ERC721Token.saveDeleteTransactionInfo();
        return;
     }
     
     //-----------------------------------------------------------------------------
     //Admin Setup
     //-----------------------------------------------------------------------------
 
     @Validator(yup.string(), yup.string())
     public async addTokenAdmin(orgId: string, userId: string) {
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721ADMIN.addAdmin', 'TOKEN');
         return await this.Ctx.ERC721Admin.addAdmin(orgId, userId);
     }
 
     @Validator(yup.string(), yup.string())
     public async removeTokenAdmin(orgId: string, userId: string) {
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721ADMIN.removeAdmin', 'TOKEN');
         return await this.Ctx.ERC721Admin.removeAdmin(orgId, userId);
     }
 
     @Validator(yup.string(), yup.string())
     public async isTokenAdmin(orgId: string, userId: string) {
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721ADMIN.isUserTokenAdmin', 'TOKEN');
         return await this.Ctx.ERC721Auth.isUserTokenAdmin(orgId, userId);
     }
     
     @Validator()
     public async getAllTokenAdmins() {
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721ADMIN.getAllAdmins', 'TOKEN');
         return await this.Ctx.ERC721Admin.getAllAdmins();
     }
 
     //-----------------------------------------------------------------------------
     //Account Setup
     //-----------------------------------------------------------------------------
 
     @Validator(yup.string(), yup.string(), yup.string())
     public async createAccount(orgId: string, userId: string, tokenType: string) {
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.createAccount', 'TOKEN');
         return await this.Ctx.ERC721Account.createAccount(orgId, userId, tokenType);
     }
 
     @Validator(yup.string(), yup.string())
     public async balanceOf(orgId: string, userId: string) {
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.balanceOf', 'TOKEN', orgId, userId);
         const accountId = await this.Ctx.ERC721Account.generateAccountId(orgId, userId);
         return await this.Ctx.ERC721Account.balanceOf(accountId);
     }
 
     /**
      * This method can be invoked only when connected to remote OBP CS/EE network.
      */
     @Validator()
     public async getAllAccounts() {
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.getAllAccounts', 'TOKEN');
         return await this.Ctx.ERC721Account.getAllAccounts();
     }
 
     @Validator(yup.string(), yup.string())
     public async getAccountByUser(orgId: string, userId: string) {
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.getAccountByUser', 'TOKEN', orgId, userId);
         return await this.Ctx.ERC721Account.getAccountByUser(orgId, userId);
     }
 
     @Validator(yup.string())
     public async getUserByAccountId(accountId: string) {
         return await this.Ctx.ERC721Account.getUserByAccountId(accountId);
     }
 
     @Validator(yup.string(), yup.string())
     public async getAccountHistory(orgId: string, userId: string) {
         const accountId = await this.Ctx.ERC721Account.generateAccountId(orgId, userId);
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.history', 'TOKEN', accountId);
         return await this.Ctx.ERC721Account.history(accountId);
     }
     
     @Validator(yup.string(), yup.string())
    public async getAccountTransactionHistory(orgId: string, userId: string) {
        const accountId = await this.Ctx.ERC721Account.generateAccountId(orgId, userId);
        await this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.getAccountTransactionHistory', 'TOKEN', accountId);
        return await this.Ctx.ERC721Account.getAccountTransactionHistory(accountId)
    }

    @Validator(yup.string(), yup.string(), yup.object().nullable())
    public async getAccountTransactionHistoryWithFilters(orgId: string, userId: string, filters ?: Filters) {
        const accountId = await this.Ctx.ERC721Account.generateAccountId(orgId, userId);
        await this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.getAccountTransactionHistoryWithFilters', 'TOKEN', accountId);
        return await this.Ctx.ERC721Account.getAccountTransactionHistoryWithFilters(accountId, filters)
    }
 
     @Validator(yup.date())
     public async deleteHistoricalTransactions(timeToExpiration: Date) {
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721TRANSACTION.deleteTransactions', 'TOKEN');
         return await this.Ctx.ERC721Transaction.deleteTransactions(timeToExpiration);
     }
 
     @Validator(yup.string())
     public async getTransactionById(transactionId: string) {
         return await this.Ctx.ERC721Transaction.getTransactionById(transactionId);
     }
 
     //-----------------------------------------------------------------------------
     //Roles Setup
     //-----------------------------------------------------------------------------
 
     @Validator(yup.string(), yup.string(), yup.string())
     public async addRole(role: string, orgId: string, userId: string) {
         const accountId = await this.Ctx.ERC721Account.generateAccountId(orgId, userId);
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.addRoleMember', 'TOKEN');
         return await this.Ctx.ERC721Token.addRoleMember(role, accountId);
     }
 
     @Validator(yup.string(), yup.string(), yup.string())
     public async removeRole(role: string, orgId: string, userId: string) {
         const accountId = await this.Ctx.ERC721Account.generateAccountId(orgId, userId);
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.removeRoleMember', 'TOKEN');
         return await this.Ctx.ERC721Token.removeRoleMember(role, accountId);
     }
 
     @Validator(yup.string())
     public async getAccountsByRole(role: string) {
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721ROLE.getAccountsByRole', 'TOKEN');
         return await this.Ctx.ERC721Role.getAccountsByRole(role);
     }
 
     @Validator(yup.string())
     public async getUsersByRole(role: string) {
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721ROLE.getUsersByRole', 'TOKEN');
         return await this.Ctx.ERC721Role.getUsersByRole(role);
     }
 
     @Validator(yup.string(), yup.string(), yup.string())
     public async isInRole(orgId: string, userId: string, role: string) {
         const accountId = await this.Ctx.ERC721Account.generateAccountId(orgId, userId);
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.isInRole', 'TOKEN', accountId);
         return { result: await this.Ctx.ERC721Token.isInRole(role, accountId) };
     }

 
     //-----------------------------------------------------------------------------
     //Mintable Behavior
     //-----------------------------------------------------------------------------
 
     @Validator(MoroccanArtCollections)
     public async createMoroccanArtCollectionsToken(tokenAsset: MoroccanArtCollections) {
         return await this.Ctx.ERC721Token.createToken(tokenAsset);
     }
 
     @Validator(MoroccanArtCollections)
     public async updateMoroccanArtCollectionsToken(tokenAsset: MoroccanArtCollections) {
         return await this.Ctx.ERC721Token.updateToken(tokenAsset);
     }
 
     //-----------------------------------------------------------------------------
     //Transferable Behavior
     //-----------------------------------------------------------------------------
 
     @Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.string().max(2000))
     public async safeTransferFrom(fromOrgId: string, fromUserId: string, toOrgId: string, toUserId: string, tokenId: string, data?: string) {
         const tokenAsset = await this.getTokenObject(tokenId);
         const fromAccountId = await this.Ctx.ERC721Account.generateAccountId(fromOrgId, fromUserId);
         const toAccountId = await this.Ctx.ERC721Account.generateAccountId(toOrgId, toUserId);
         return await this.Ctx.ERC721Token.safeTransferFrom(fromAccountId, toAccountId, tokenAsset, data);
     }
 
     @Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.string())
     public async transferFrom(fromOrgId: string, fromUserId: string, toOrgId: string, toUserId: string, tokenId: string) {
         const tokenAsset = await this.getTokenObject(tokenId);
         const fromAccountId = await this.Ctx.ERC721Account.generateAccountId(fromOrgId, fromUserId);
         const toAccountId = await this.Ctx.ERC721Account.generateAccountId(toOrgId, toUserId);
         return await this.Ctx.ERC721Token.transferFrom(fromAccountId, toAccountId, tokenAsset);
     }
 
     //-----------------------------------------------------------------------------
     //Burnable Behavior
     //-----------------------------------------------------------------------------
 
     @Validator(yup.string())
     public async burn(tokenId: string) {
         const tokenAsset = await this.getTokenObject(tokenId);
         return await this.Ctx.ERC721Token.burn(tokenAsset);
     }
     //-----------------------------------------------------------------------------
     //Token
     //-----------------------------------------------------------------------------
 
     /**
      * This method can be invoked only when connected to remote OBP CS/EE network.
      */
     @Validator()
     public async getAllTokens() {
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.getAllTokens', 'TOKEN');
         return await this.Ctx.ERC721Token.getAllTokens();
     }
 
     /**
      * This method can be invoked only when connected to remote OBP CS/EE network.
      */
     @Validator(yup.string(), yup.string())
     public async getAllTokensByUser(orgId: string, userId: string) {
         const accountId = await this.Ctx.ERC721Account.generateAccountId(orgId, userId);
         await this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.getAllTokensByUser', 'TOKEN', accountId);
         return await this.Ctx.ERC721Token.getAllTokensByUser(accountId);
     }
 
     /**
      * Function getTokenObject returns an Object of a Class which extends Token<any> Class. User need to explicitly typecast it to desired Class to access Token properties.
      * @param {string} token_id Token Id of the Token
      * @returns Promise of <T extends Token<any>>
      */
     public async getTokenObject<T extends OchainModel<any>>(tokenId: string): Promise<T> {
         if (!tokenId) {
             throw Error('TokenID cannot be null/empty.');
         }
         const token = await this.Ctx.ERC721Token.get(tokenId);
         if (token.tokenName && token.assetType && token.assetType === 'otoken') {
             let tokenAsset;
             switch (token.tokenName) {
                case 'moroccanartcollections':
                    tokenAsset = new MoroccanArtCollections(token, false, true);
                    return tokenAsset;
                default:
                    throw new Error(`No token exists with ID [${tokenId}]`);
             }
         } else {
             throw new Error(`No token exists with ID [${tokenId}]`);
         }
     }
 
     @Validator(yup.string())
     public async getTokenById(tokenId: string) {
        await this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.get', 'TOKEN', tokenId);
        let token = await this.getTokenObject(tokenId);
        return token;
     }
 
     /**
      * This method can be invoked only when connected to remote OBP CS/EE network.
      */
     
     @Validator(yup.string())
     public async getTokenHistory(tokenId: string) {
        // await this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.history', 'TOKEN');
        return await this.Ctx.ERC721Token.history(tokenId);
     }
 
     @Validator(yup.string())
     public async ownerOf(tokenId: string) {
        return await this.Ctx.ERC721Token.ownerOf(tokenId);
     }
 
     @Validator()
     public async name() {
        return await this.Ctx.ERC721Token.name();
     }
 
     @Validator()
     public async symbol() {
        return await this.Ctx.ERC721Token.symbol();
     }
 
     @Validator(yup.string())
     public async tokenURI(tokenId: string) {
        return await this.Ctx.ERC721Token.tokenURI(tokenId);
     }
 
    @Validator()
    public async totalSupply() {
    await this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.totalSupply', 'TOKEN');
    return await this.Ctx.ERC721Token.totalSupply();
    }
 
    @Validator()
    public async totalNetSupply() {
        await this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.totalNetSupply', 'TOKEN');
        return await this.Ctx.ERC721Token.getTotalMintedTokens();
    }
 
  //-----------------------------------------------------------------------------
    
  /**
   *
   * BDB sql rich queries can be executed in OBP CS/EE.
   * This method can be invoked only when connected to remote OBP CS/EE network.
   *
   */
  
/**
*      
* BDB sql rich queries can be executed in OBP CS/EE.
* This method can be invoked only when connected to remote OBP CS/EE network.
*    
*/
@Validator(yup.string())
    public async executeQuery(query: string) {
        const result = await this.query(query);
        return result;
    }
@Validator(yup.string(), yup.string(), yup.string())
          public async createAccountByConsumers(org_id: string, user_id: string, token_type: string) {       
          //await this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.createAccount', 'TOKEN');
          return await this.Ctx.ERC721Account.createAccount(org_id, user_id, token_type);   
    }
@Validator(yup.string(), yup.number())
public async sell (token_id: string, selling_price: number) {       
          try {  
            const token = await this.Ctx.ERC721Token.get(token_id);
            const t = new MoroccanArtCollections(token)
            t.price =  selling_price;
            t.on_sale_flag = true;
            //console.log(token);           
            await this.Ctx.ERC721Token.updateToken(t);
            return `Token ID : '${token_id}' has been posted for selling in the marketplace'`;           
          } catch(error) {
                throw new Error(error.message);
        }
}
@Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.number())
public async buyWithTokens(from_org_id: string, from_user_id: string, to_org_id: string, to_user_id: string, nonfungible_token_id: string, fungible_token_id: string, amount_paid: number) {
        try {  
            const token = await this.Ctx.ERC721Token.get(nonfungible_token_id);
            const t = new MoroccanArtCollections(token);
            const oChainUtil = new OChainUtils(this.Ctx.Stub);
            var msg = `Token ID : '${nonfungible_token_id}' had not been transferred'`;
            if (t.on_sale_flag==true) {
                if(t.price == amount_paid) {                   
                     // @ts-ignore
                    await oChainUtil.invokeChaincode("LoyaltyToken7", "transferTokens", [fungible_token_id, from_org_id, from_user_id, amount_paid], "marketplace");
                    const from_account_id = await this.Ctx.ERC721Account.generateAccountId(from_org_id, from_user_id);                   
                    const to_account_id = await this.Ctx.ERC721Account.generateAccountId(to_org_id, to_user_id);         
                    await this.Ctx.ERC721Token.transferFrom(from_account_id, to_account_id, t);
     
                    msg = `Token ID : '${nonfungible_token_id}' has been successfully transferred to UserID : '${to_user_id}'`;           
              }           
            }
            else {
                msg = `Token ID : '${nonfungible_token_id}' has not been transferred to UserID : '${to_user_id}' as the amount was not fully paid'`;
            }
            return msg;
       } catch(error)
          {
            throw new Error(error.message);
         }
}
@Validator(yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.number())
    public async buyWithDirectPayment(from_org_id: string, from_user_id: string, to_org_id: string, to_user_id: string, nonfungible_token_id: string, amount_paid: number) {
         try {  
             const token = await this.Ctx.ERC721Token.get(nonfungible_token_id);
             const t = new MoroccanArtCollections(token);
             var msg = `Token ID : '${nonfungible_token_id}' had not been transferred'`;           
           if (t.on_sale_flag==true) {
                 if(t.price == amount_paid) {                   
                 const from_account_id = await this.Ctx.ERC721Account.generateAccountId(from_org_id, from_user_id);         
                 const to_account_id = await this.Ctx.ERC721Account.generateAccountId(to_org_id, to_user_id);                   
                 await this.Ctx.ERC721Token.transferFrom(from_account_id, to_account_id, t);
                   
                 msg = `Token ID : '${nonfungible_token_id}' has been successfully transferred to UserID : '${to_user_id}'`;
                 }
             }
             else {
                 msg = `Token ID : '${nonfungible_token_id}' has not been transferred to UserID : '${to_user_id}' as the amount was not fully paid'`;
             }
             return msg;
         } catch(error) {         
             throw new Error(error.message);
         }
      }
}


