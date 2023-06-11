/**
 *
 * Copyright (c) 2022, Oracle and/or its affiliates. All rights reserved.
 *
 */


/*
Uncomment the line in the DELETE_TRANSACTIONS_IN_MONTH object to enable the auto-delete-tansactions feature.
Transactions are deleted on a monthly basis. For example, if the VALUE parameter is set to 3, then transactions older than 3 months are deleted every 24 hours.
The auto-delete-transactions feature is disabled if the VALUE parameter is 0 or negative.
*/
export const DELETE_TRANSACTIONS_IN_MONTH = {
    //VALUE: 0,
};