/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
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

import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  componentLevelPageContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    padding: theme.spacing(3),
  },
  inspectorSlider: {
    border: `1px solid ${theme.palette.grey[200]}`,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
    boxShadow: `0 0 1px ${theme.palette.secondary.main}, 0 1px 2px ${theme.palette.grey[100]}`,
    marginRight: theme.spacing(1),
  },
  inspectorRightSlider: {
    // border: `1px solid ${theme.palette.grey[200]}`,
    padding: theme.spacing(0, 2),
    borderRadius: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  inspectorResult: {
    overflow: 'auto',
    minHeight: theme.spacing(90),
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  tabsList: {
    display: 'flex',
    gap: '0.5rem',
    padding: '0.5rem',
    backgroundColor: '#F2F8FE',
    borderRadius: '0.5rem',
    alignItems: 'center',
  },

  tabTrigger: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: 500,
    fontSize: '14px',
    color: '#64748b',
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease',
    border: '1px solid transparent',

    '&:hover': {
      backgroundColor: '#f1f5f9',
    },

    '&[data-state="active"]': {
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
      color: '#0f172a',
      border: '1px solid #e2e8f0',
    },
  },

  tabIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
}));
