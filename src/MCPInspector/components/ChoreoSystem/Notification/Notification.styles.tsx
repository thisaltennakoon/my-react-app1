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

import { alpha, createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.secondary.dark,
      fontSize: theme.spacing(1.625),
      position: 'relative',
      padding: theme.spacing(0, 3, 0, 3),
    },
    fullWidth: {
      width: '100%',
    },
    notificationInner: {
      display: 'flex',
      gap: theme.spacing(1.5),
    },
    notificationContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(1.5, 0),
      textAlign: 'left',
    },
    primaryContained: {
      borderLeftColor: theme.palette.primary.main,
      backgroundColor: theme.custom.indigo[100],
      boxShadow: `inset 2px 0px 0px ${theme.palette.primary.main}`,
    },
    secondaryContained: {
      borderLeft: 'none',
      backgroundColor: theme.palette.secondary.light,
      boxShadow: 'none',
    },
    successContained: {
      borderLeftColor: theme.palette.success.main,
      backgroundColor: theme.palette.success.light,
      boxShadow: `inset 2px 0px 0px ${theme.palette.success.main}`,
    },
    defaultContained: {
      backgroundColor: theme.palette.common.white,
      borderRadius: 6,
    },
    warningContained: {
      borderLeftColor: theme.palette.warning.dark,
      backgroundColor: theme.palette.warning.light,
      boxShadow: `inset 2px 0px 0px ${theme.palette.warning.dark}`,
    },
    errorContained: {
      borderLeftColor: theme.palette.error.main,
      backgroundColor: theme.palette.error.light,
      boxShadow: `inset 2px 0px 0px ${theme.palette.error.main}`,
    },
    iconWrapper: {
      padding: theme.spacing(1.5, 0),
    },
    iconRoot: {
      padding: theme.spacing(1.3),
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
    },
    primaryIcon: {
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
    secondaryIcon: {
      color: theme.palette.secondary.dark,
      backgroundColor: alpha(theme.palette.secondary.dark, 0.1),
    },
    successIcon: {
      color: theme.palette.success.main,
      backgroundColor: alpha(theme.palette.success.main, 0.1),
    },
    defaultIcon: {
      color: theme.palette.secondary.main,
      backgroundColor: alpha(theme.palette.secondary.main, 0.1),
    },
    warningIcon: {
      color: theme.palette.warning.dark,
      backgroundColor: alpha(theme.palette.warning.dark, 0.1),
    },
    errorIcon: {
      color: theme.palette.error.main,
      backgroundColor: alpha(theme.palette.error.main, 0.1),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(0.5),
      top: theme.spacing(0.5),
    },
    closeIcon: {
      fontSize: theme.spacing(2.25),
    },
    imageWrapper: {
      width: 'auto',
      '& svg': {
        height: '100%',
        width: 'auto',
        display: 'block',
        minHeight: theme.spacing(8),
      },
    },
  })
);

export default useStyles;
