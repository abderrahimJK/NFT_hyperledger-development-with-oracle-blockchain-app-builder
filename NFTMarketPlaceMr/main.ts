/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */
import ChaincodeSDK from './lib/chaincode';

import { NFTMarketPlaceMrController } from './src/controller/NFTMarketPlaceMr.controller';


ChaincodeSDK({
    chainCodeName: 'NFTMarketPlaceMr',
    chainCode: NFTMarketPlaceMrController,
});
