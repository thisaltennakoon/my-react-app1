/*
 * Copyright (c) 2022, WSO2 Inc. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 Inc. and its suppliers, if any.
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

export default function ErrorFillIcon() {
  const classes = useStyles();

  return (
    <svg viewBox="0 0 16 16" className={classes.defaultMainIcon}>
      <path
        d="M4.41421 0.585786L0.585786 4.41421C0.210714 4.78929 0 5.29799
         0 5.82843V10.1716C0 10.702 0.210713 11.2107 0.585786 11.5858L4.41421 
         15.4142C4.78929 15.7893 5.29799 16 5.82843 16H10.1716C10.702 16 
         11.2107 15.7893 11.5858 15.4142L15.4142 11.5858C15.7893 11.2107 
         16 10.702 16 10.1716V5.82843C16 5.29799 15.7893 4.78929 15.4142 
         4.41421L11.5858 0.585786C11.2107 0.210714 10.702 0 10.1716 
         0H5.82843C5.29799 0 4.78929 0.210713 4.41421 0.585786Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2087 6.20711C11.5992 5.81658 11.5992 5.18342 11.2087 
        4.79289C10.8182 4.40237 10.185 4.40237 9.79447 4.79289L8.00079 
        6.58657L6.20711 4.79289C5.81659 4.40237 5.18342 4.40237 4.7929 
        4.79289C4.40237 5.18342 4.40237 5.81658 4.7929 6.20711L6.58657 
        8.00078L4.79289 9.79447C4.40237 10.185 4.40237 10.8182 4.79289 
        11.2087C5.18342 11.5992 5.81658 11.5992 6.20711 11.2087L8.00079 
        9.415L9.79447 11.2087C10.185 11.5992 10.8182 11.5992 11.2087 
        11.2087C11.5992 10.8182 11.5992 10.185 11.2087 9.79447L9.415 
        8.00079L11.2087 6.20711Z"
        fill="#ffffff"
      />
    </svg>
  );
}
