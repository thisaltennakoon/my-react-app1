/*
 * Copyright (c) 2021, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
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

export default function InfoFilledIcon() {
  const classes = useStyles();

  return (
    <svg
      focusable="false"
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={classes.defaultMainIcon}
    >
      <path
        d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0
         10 0C15.5228 0 20 4.47715 20 10Z"
        fill="currentColor"
      />
      <path
        d="M10.25 12.75C10.9404 12.75 11.5 13.3096 11.5 14C11.5 14.6904 10.9404 15.25 10.25 15.25C9.55964 
15.25 9 14.6904 9 14C9 13.3096 9.55964 12.75 10.25 12.75ZM10.25 4C10.9404 4 11.5 4.55964 11.5 5.25V10.25C11.5 
10.9404 10.9404 11.5 10.25 11.5C9.55964 11.5 9 10.9404 9 10.25V5.25C9 4.55964 9.55964 4 10.25 4Z"
        fill="white"
      />
    </svg>
  );
}
