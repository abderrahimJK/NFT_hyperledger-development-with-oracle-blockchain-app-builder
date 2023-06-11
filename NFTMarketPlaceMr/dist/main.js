"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chaincode_1 = require("./lib/chaincode");
const NFTMarketPlaceMr_controller_1 = require("./src/controller/NFTMarketPlaceMr.controller");
(0, chaincode_1.default)({
    chainCodeName: 'NFTMarketPlaceMr',
    chainCode: NFTMarketPlaceMr_controller_1.NFTMarketPlaceMrController,
});
//# sourceMappingURL=main.js.map