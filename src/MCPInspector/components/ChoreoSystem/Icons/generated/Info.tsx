/* eslint-disable prettier/prettier */
/* eslint-disable max-len */

/*
 * Copyright (c) 2023, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses.
 * For specific language governing the permissions and limitations under
 * this license, please see the license as well as any agreement you’ve
 * entered into with WSO2 governing the purchase of this software and any
 * associated services.
 */

import { createSvgIcon } from '@material-ui/core';
import * as React from 'react';

export default createSvgIcon(
  <path
    stroke="currentColor"
    d="M.5 12C.5 5.6487 5.6487.5 12 .5S23.5 5.6487 23.5 12 18.3513 23.5 12 23.5.5 18.3513.5 12ZM23 12c0-6.0751-4.9249-11-11-11S1 5.9249 1 12s4.9249 11 11 11 11-4.9249 11-11ZM12 5c.5523 0 1 .4477 1 1s-.4477 1-1 1-1-.4477-1-1 .4477-1 1-1Zm0 5.3079a.6255.6255 0 0 1 .6112.4932l.0138.1541v7.4212a.625.625 0 0 1-.625.625.6255.6255 0 0 1-.6112-.4932l-.0138-.1541v-7.4212a.625.625 0 0 1 .625-.625Z"
  />,
  'Info'
);
