"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoroccanArtCollections = exports.MoroccanArtCollectionsMetadata = void 0;
const tslib_1 = require("tslib");
const yup = require("yup");
const decorators_1 = require("../../lib/decorators");
const ochain_model_1 = require("../../lib/ochain-model");
const ochain_embedded_model_1 = require("../../lib/ochain-embedded-model");
class MoroccanArtCollectionsMetadata extends ochain_embedded_model_1.EmbeddedModel {
}
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollectionsMetadata.prototype, "painting_name", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollectionsMetadata.prototype, "description", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollectionsMetadata.prototype, "image", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollectionsMetadata.prototype, "painter_name", void 0);
exports.MoroccanArtCollectionsMetadata = MoroccanArtCollectionsMetadata;
let MoroccanArtCollections = class MoroccanArtCollections extends ochain_model_1.OchainModel {
    constructor() {
        super(...arguments);
        this.assetType = "otoken";
    }
};
tslib_1.__decorate([
    (0, decorators_1.Mandatory)(),
    (0, decorators_1.Validate)(yup
        .string()
        .required()
        .matches(/^[A-Za-z0-9][A-Za-z0-9_-]*$/)
        .max(16)),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "tokenId", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)("moroccanartcollections"),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "tokenName", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string().trim().max(256)),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "tokenDesc", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)("ART"),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "symbol", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)("erc721+"),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "tokenStandard", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)("nonfungible"),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "tokenType", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)("whole"),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "tokenUnit", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)(["indivisible", "singleton", "mintable", "transferable", "burnable", "roles"]),
    tslib_1.__metadata("design:type", Array)
], MoroccanArtCollections.prototype, "behaviors", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)({ minter_role_name: "minter" }),
    tslib_1.__metadata("design:type", Object)
], MoroccanArtCollections.prototype, "roles", void 0);
tslib_1.__decorate([
    (0, decorators_1.ReadOnly)({ max_mint_quantity: 0 }),
    tslib_1.__metadata("design:type", Object)
], MoroccanArtCollections.prototype, "mintable", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "transferredBy", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "creationDate", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "transferredDate", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.bool()),
    tslib_1.__metadata("design:type", Boolean)
], MoroccanArtCollections.prototype, "isBurned", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "burnedBy", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.string()),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "burnedDate", void 0);
tslib_1.__decorate([
    (0, decorators_1.Mandatory)(),
    (0, decorators_1.Validate)(yup.string().required().max(2000)),
    tslib_1.__metadata("design:type", String)
], MoroccanArtCollections.prototype, "tokenUri", void 0);
tslib_1.__decorate([
    (0, decorators_1.Embedded)(MoroccanArtCollectionsMetadata),
    tslib_1.__metadata("design:type", MoroccanArtCollectionsMetadata)
], MoroccanArtCollections.prototype, "metadata", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.number()),
    tslib_1.__metadata("design:type", Number)
], MoroccanArtCollections.prototype, "price", void 0);
tslib_1.__decorate([
    (0, decorators_1.Validate)(yup.boolean()),
    tslib_1.__metadata("design:type", Boolean)
], MoroccanArtCollections.prototype, "on_sale_flag", void 0);
MoroccanArtCollections = tslib_1.__decorate([
    (0, decorators_1.Id)("tokenId")
], MoroccanArtCollections);
exports.MoroccanArtCollections = MoroccanArtCollections;
//# sourceMappingURL=NFTMarketPlaceMr.model.js.map