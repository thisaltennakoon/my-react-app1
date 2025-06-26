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
import React from 'react';
import { useStyles } from './style';

export default function SuccessFillIcon() {
  const classes = useStyles();

  return (
    <svg viewBox="0 0 16 16" className={classes.defaultMainIcon}>
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M10.4848 5.73483C10.6313 5.58839 10.8687 5.58839 11.0152 5.73483C11.1483 5.86797 
        11.1604 6.0763 11.0515 6.22311L11.0152 6.26517L7.25 10.0303L4.98483 7.76517C4.83839
         7.61872 4.83839 7.38128 4.98483 7.23483C5.11797 7.1017 5.3263 7.0896 5.47311 
         7.19853L5.51517 7.23483L7.25 8.9695L10.4848 5.73483Z"
        fill="white"
        stroke="white"
      />
    </svg>
  );
}
