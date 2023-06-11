"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTMarketPlaceMrController = void 0;
const tslib_1 = require("tslib");
const yup = require("yup");
const decorators_1 = require("../../lib/decorators");
const ochain_controller_1 = require("../../lib/ochain-controller");
const NFTMarketPlaceMr_model_1 = require("../model/NFTMarketPlaceMr.model");
const erc721_token_account_1 = require("../../lib/erc721-token-account");
const utils_1 = require("../../lib/utils");
class NFTMarketPlaceMrController extends ochain_controller_1.OchainController {
    constructor(ctx) {
        super(ctx.Stub);
        this.Ctx = ctx;
    }
    init(adminList) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Admin.initAdmin(adminList);
            yield this.Ctx.ERC721Token.saveClassInfo(NFTMarketPlaceMr_model_1.MoroccanArtCollections);
            yield this.Ctx.ERC721Token.saveDeleteTransactionInfo();
            return;
        });
    }
    addTokenAdmin(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721ADMIN.addAdmin', 'TOKEN');
            return yield this.Ctx.ERC721Admin.addAdmin(orgId, userId);
        });
    }
    removeTokenAdmin(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721ADMIN.removeAdmin', 'TOKEN');
            return yield this.Ctx.ERC721Admin.removeAdmin(orgId, userId);
        });
    }
    isTokenAdmin(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721ADMIN.isUserTokenAdmin', 'TOKEN');
            return yield this.Ctx.ERC721Auth.isUserTokenAdmin(orgId, userId);
        });
    }
    getAllTokenAdmins() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721ADMIN.getAllAdmins', 'TOKEN');
            return yield this.Ctx.ERC721Admin.getAllAdmins();
        });
    }
    createAccount(orgId, userId, tokenType) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.createAccount', 'TOKEN');
            return yield this.Ctx.ERC721Account.createAccount(orgId, userId, tokenType);
        });
    }
    balanceOf(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.balanceOf', 'TOKEN', orgId, userId);
            const accountId = yield this.Ctx.ERC721Account.generateAccountId(orgId, userId);
            return yield this.Ctx.ERC721Account.balanceOf(accountId);
        });
    }
    getAllAccounts() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.getAllAccounts', 'TOKEN');
            return yield this.Ctx.ERC721Account.getAllAccounts();
        });
    }
    getAccountByUser(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.getAccountByUser', 'TOKEN', orgId, userId);
            return yield this.Ctx.ERC721Account.getAccountByUser(orgId, userId);
        });
    }
    getUserByAccountId(accountId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC721Account.getUserByAccountId(accountId);
        });
    }
    getAccountHistory(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accountId = yield this.Ctx.ERC721Account.generateAccountId(orgId, userId);
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.history', 'TOKEN', accountId);
            return yield this.Ctx.ERC721Account.history(accountId);
        });
    }
    getAccountTransactionHistory(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accountId = yield this.Ctx.ERC721Account.generateAccountId(orgId, userId);
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.getAccountTransactionHistory', 'TOKEN', accountId);
            return yield this.Ctx.ERC721Account.getAccountTransactionHistory(accountId);
        });
    }
    getAccountTransactionHistoryWithFilters(orgId, userId, filters) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accountId = yield this.Ctx.ERC721Account.generateAccountId(orgId, userId);
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721ACCOUNT.getAccountTransactionHistoryWithFilters', 'TOKEN', accountId);
            return yield this.Ctx.ERC721Account.getAccountTransactionHistoryWithFilters(accountId, filters);
        });
    }
    deleteHistoricalTransactions(timeToExpiration) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721TRANSACTION.deleteTransactions', 'TOKEN');
            return yield this.Ctx.ERC721Transaction.deleteTransactions(timeToExpiration);
        });
    }
    getTransactionById(transactionId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC721Transaction.getTransactionById(transactionId);
        });
    }
    addRole(role, orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accountId = yield this.Ctx.ERC721Account.generateAccountId(orgId, userId);
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.addRoleMember', 'TOKEN');
            return yield this.Ctx.ERC721Token.addRoleMember(role, accountId);
        });
    }
    removeRole(role, orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accountId = yield this.Ctx.ERC721Account.generateAccountId(orgId, userId);
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.removeRoleMember', 'TOKEN');
            return yield this.Ctx.ERC721Token.removeRoleMember(role, accountId);
        });
    }
    getAccountsByRole(role) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721ROLE.getAccountsByRole', 'TOKEN');
            return yield this.Ctx.ERC721Role.getAccountsByRole(role);
        });
    }
    getUsersByRole(role) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721ROLE.getUsersByRole', 'TOKEN');
            return yield this.Ctx.ERC721Role.getUsersByRole(role);
        });
    }
    isInRole(orgId, userId, role) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accountId = yield this.Ctx.ERC721Account.generateAccountId(orgId, userId);
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.isInRole', 'TOKEN', accountId);
            return { result: yield this.Ctx.ERC721Token.isInRole(role, accountId) };
        });
    }
    createMoroccanArtCollectionsToken(tokenAsset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC721Token.createToken(tokenAsset);
        });
    }
    updateMoroccanArtCollectionsToken(tokenAsset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC721Token.updateToken(tokenAsset);
        });
    }
    safeTransferFrom(fromOrgId, fromUserId, toOrgId, toUserId, tokenId, data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tokenAsset = yield this.getTokenObject(tokenId);
            const fromAccountId = yield this.Ctx.ERC721Account.generateAccountId(fromOrgId, fromUserId);
            const toAccountId = yield this.Ctx.ERC721Account.generateAccountId(toOrgId, toUserId);
            return yield this.Ctx.ERC721Token.safeTransferFrom(fromAccountId, toAccountId, tokenAsset, data);
        });
    }
    transferFrom(fromOrgId, fromUserId, toOrgId, toUserId, tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tokenAsset = yield this.getTokenObject(tokenId);
            const fromAccountId = yield this.Ctx.ERC721Account.generateAccountId(fromOrgId, fromUserId);
            const toAccountId = yield this.Ctx.ERC721Account.generateAccountId(toOrgId, toUserId);
            return yield this.Ctx.ERC721Token.transferFrom(fromAccountId, toAccountId, tokenAsset);
        });
    }
    burn(tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tokenAsset = yield this.getTokenObject(tokenId);
            return yield this.Ctx.ERC721Token.burn(tokenAsset);
        });
    }
    getAllTokens() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.getAllTokens', 'TOKEN');
            return yield this.Ctx.ERC721Token.getAllTokens();
        });
    }
    getAllTokensByUser(orgId, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const accountId = yield this.Ctx.ERC721Account.generateAccountId(orgId, userId);
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.getAllTokensByUser', 'TOKEN', accountId);
            return yield this.Ctx.ERC721Token.getAllTokensByUser(accountId);
        });
    }
    getTokenObject(tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!tokenId) {
                throw Error('TokenID cannot be null/empty.');
            }
            const token = yield this.Ctx.ERC721Token.get(tokenId);
            if (token.tokenName && token.assetType && token.assetType === 'otoken') {
                let tokenAsset;
                switch (token.tokenName) {
                    case 'moroccanartcollections':
                        tokenAsset = new NFTMarketPlaceMr_model_1.MoroccanArtCollections(token, false, true);
                        return tokenAsset;
                    default:
                        throw new Error(`No token exists with ID [${tokenId}]`);
                }
            }
            else {
                throw new Error(`No token exists with ID [${tokenId}]`);
            }
        });
    }
    getTokenById(tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.get', 'TOKEN', tokenId);
            let token = yield this.getTokenObject(tokenId);
            return token;
        });
    }
    getTokenHistory(tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC721Token.history(tokenId);
        });
    }
    ownerOf(tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC721Token.ownerOf(tokenId);
        });
    }
    name() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC721Token.name();
        });
    }
    symbol() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC721Token.symbol();
        });
    }
    tokenURI(tokenId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC721Token.tokenURI(tokenId);
        });
    }
    totalSupply() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.totalSupply', 'TOKEN');
            return yield this.Ctx.ERC721Token.totalSupply();
        });
    }
    totalNetSupply() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Ctx.ERC721Auth.checkAuthorization('ERC721TOKEN.totalNetSupply', 'TOKEN');
            return yield this.Ctx.ERC721Token.getTotalMintedTokens();
        });
    }
    executeQuery(query) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.query(query);
            return result;
        });
    }
    createAccountByConsumers(org_id, user_id, token_type) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.Ctx.ERC721Account.createAccount(org_id, user_id, token_type);
        });
    }
    sell(token_id, selling_price) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.Ctx.ERC721Token.get(token_id);
                const t = new NFTMarketPlaceMr_model_1.MoroccanArtCollections(token);
                t.price = selling_price;
                t.on_sale_flag = true;
                yield this.Ctx.ERC721Token.updateToken(t);
                return `Token ID : '${token_id}' has been posted for selling in the marketplace'`;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    buyWithTokens(from_org_id, from_user_id, to_org_id, to_user_id, nonfungible_token_id, fungible_token_id, amount_paid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.Ctx.ERC721Token.get(nonfungible_token_id);
                const t = new NFTMarketPlaceMr_model_1.MoroccanArtCollections(token);
                const oChainUtil = new utils_1.OChainUtils(this.Ctx.Stub);
                var msg = `Token ID : '${nonfungible_token_id}' had not been transferred'`;
                if (t.on_sale_flag == true) {
                    if (t.price == amount_paid) {
                        yield oChainUtil.invokeChaincode("LoyaltyToken7", "transferTokens", [fungible_token_id, from_org_id, from_user_id, amount_paid], "marketplace");
                        const from_account_id = yield this.Ctx.ERC721Account.generateAccountId(from_org_id, from_user_id);
                        const to_account_id = yield this.Ctx.ERC721Account.generateAccountId(to_org_id, to_user_id);
                        yield this.Ctx.ERC721Token.transferFrom(from_account_id, to_account_id, t);
                        msg = `Token ID : '${nonfungible_token_id}' has been successfully transferred to UserID : '${to_user_id}'`;
                    }
                }
                else {
                    msg = `Token ID : '${nonfungible_token_id}' has not been transferred to UserID : '${to_user_id}' as the amount was not fully paid'`;
                }
                return msg;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    buyWithDirectPayment(from_org_id, from_user_id, to_org_id, to_user_id, nonfungible_token_id, amount_paid) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.Ctx.ERC721Token.get(nonfungible_token_id);
                const t = new NFTMarketPlaceMr_model_1.MoroccanArtCollections(token);
                var msg = `Token ID : '${nonfungible_token_id}' had not been transferred'`;
                if (t.on_sale_flag == true) {
                    if (t.price == amount_paid) {
                        const from_account_id = yield this.Ctx.ERC721Account.generateAccountId(from_org_id, from_user_id);
                        const to_account_id = yield this.Ctx.ERC721Account.generateAccountId(to_org_id, to_user_id);
                        yield this.Ctx.ERC721Token.transferFrom(from_account_id, to_account_id, t);
                        msg = `Token ID : '${nonfungible_token_id}' has been successfully transferred to UserID : '${to_user_id}'`;
                    }
                }
                else {
                    msg = `Token ID : '${nonfungible_token_id}' has not been transferred to UserID : '${to_user_id}' as the amount was not fully paid'`;
                }
                return msg;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.array().of(yup.object()).nullable()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "init", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "addTokenAdmin", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "removeTokenAdmin", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "isTokenAdmin", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getAllTokenAdmins", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "createAccount", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "balanceOf", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getAllAccounts", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getAccountByUser", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getUserByAccountId", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getAccountHistory", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getAccountTransactionHistory", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.object().nullable()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, erc721_token_account_1.Filters]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getAccountTransactionHistoryWithFilters", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.date()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Date]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "deleteHistoricalTransactions", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getTransactionById", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "addRole", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "removeRole", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getAccountsByRole", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getUsersByRole", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "isInRole", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(NFTMarketPlaceMr_model_1.MoroccanArtCollections),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [NFTMarketPlaceMr_model_1.MoroccanArtCollections]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "createMoroccanArtCollectionsToken", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(NFTMarketPlaceMr_model_1.MoroccanArtCollections),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [NFTMarketPlaceMr_model_1.MoroccanArtCollections]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "updateMoroccanArtCollectionsToken", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.string().max(2000)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "safeTransferFrom", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string(), yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "transferFrom", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "burn", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getAllTokens", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getAllTokensByUser", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getTokenById", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "getTokenHistory", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "ownerOf", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "name", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "symbol", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "tokenURI", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "totalSupply", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "totalNetSupply", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "executeQuery", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "createAccountByConsumers", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.number()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "sell", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.number()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "buyWithTokens", null);
tslib_1.__decorate([
    (0, decorators_1.Validator)(yup.string(), yup.string(), yup.string(), yup.string(), yup.string(), yup.number()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, String, String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], NFTMarketPlaceMrController.prototype, "buyWithDirectPayment", null);
exports.NFTMarketPlaceMrController = NFTMarketPlaceMrController;
//# sourceMappingURL=NFTMarketPlaceMr.controller.js.map