/*
 * Copyright (c) 2022, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
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

export default function WarningIcon() {
  const classes = useStyles();

  return (
    <svg
      focusable="false"
      viewBox="0 0 20 18.75"
      aria-hidden="true"
      className={classes.defaultMainIcon}
    >
      <path
        id="Path_6"
        d="M10,0a2.606,2.606,0,0,1,2.127,1.089l.118.176,7.39,13.623a2.447,2.447,0,0,1,0,2.564,2.52,2.52,0,0,1-2.031,
        1.29l-.214.008H2.577a2.573,2.573,0,0,1-2.245-1.3,2.53,2.53,0,0,1-.068-2.379l.1-.185L7.757,1.265A2.614,
        2.614,0,0,1,10,0Z"
        fill="currentColor"
      />
      <path
        id="Path_7"
        d="M10,13.125a1.25,1.25,0,1,1-1.25,1.25A1.25,1.25,0,0,1,10,13.125Zm0-8.75a1.25,1.25,0,0,1,1.25,1.25v5a1.25,
        1.25,0,0,1-2.5,0v-5A1.25,1.25,0,0,1,10,4.375Z"
        fill="#fff"
      />
    </svg>
  );
}
