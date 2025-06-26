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
    paddingTop: theme.spacing(3),
  },
  optionBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#f2f8ff',
    minWidth: 100,
    padding: 6,
    border: `1px solid ${theme.palette.grey[200]}`,
    marginTop: theme.spacing(1),
  },
  toolPanel: {
    // borderRight: `1px solid ${theme.palette.grey[200]}`,
  },
  resultSection: {
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    backgroundColor: '#fff',
    marginTop: theme.spacing(1),
  },
  resultSectionHeader: {
    padding: theme.spacing(1, 2),
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 600,
    fontSize: '1.125rem',
    margin: 0,
  },
  resultSectionBody: {
    padding: '16px',
    minHeight: theme.spacing(30),
  },
  itemsContainer: {
    maxHeight: '24rem',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  item: {
    backgroundColor: '#fef6ea',
    border: '1px solid #f2d4a7',
    padding: '0.5rem 1rem',
    borderRadius: 6,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgb(248, 216, 169)',
    },
  },
  errorBox: {
    position: 'relative',
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '6px',
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  copyButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    minWidth: 0,
    padding: 6,
  },
  copyIcon: {
    fontSize: 16,
  },
  copySuccessIcon: {
    fontSize: 16,
    color: '#16a34a',
  },
  errorText: {
    fontSize: '0.875rem',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    overflow: 'auto',
  },
  jsonResponseBox: {
    position: 'relative',
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '6px',
    maxHeight: theme.spacing(50),
    overflow: 'auto',
    border: `1px solid ${theme.palette.grey[200]}`,
  },
  historyList: {
    backgroundColor: '#F2F8FE',
    padding: theme.spacing(1.5, 2),
    borderRadius: 6,
    marginTop: theme.spacing(1),
  },
}));
