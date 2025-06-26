/* eslint-disable react/jsx-props-no-spreading */
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
import { Box, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import {
  ErrorFillIcon,
  InfoFilledIcon,
  SuccessFillIcon,
  WarningIcon,
} from '../assets/iconComponents';
import { CloseIcon } from '../assets/icons';
import useStyles from './Notification.styles';

export interface NotificationProps {
  title?: React.ReactNode | string;
  children: React.ReactNode;
  icon?: 'info' | 'error' | 'warning' | 'success';
  bannerImg?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'default' | 'warning' | 'error';
  onClose?: () => void;
  fullWidth?: boolean;
  testId: string;
  className?: string;
}

const Notification = (props: NotificationProps) => {
  const {
    children,
    icon,
    bannerImg,
    title,
    color = 'default',
    onClose,
    fullWidth,
    testId,
    className = '',
  } = props;
  const classes = useStyles();

  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return classes.primaryContained;
      case 'secondary':
        return classes.secondaryContained;
      case 'success':
        return classes.successContained;
      case 'default':
        return classes.defaultContained;
      case 'warning':
        return classes.warningContained;
      case 'error':
        return classes.errorContained;
      default:
        return classes.defaultContained;
    }
  };

  const getIconColorClass = () => {
    switch (color) {
      case 'primary':
        return classes.primaryIcon;
      case 'secondary':
        return classes.secondaryIcon;
      case 'success':
        return classes.successIcon;
      case 'default':
        return classes.defaultIcon;
      case 'warning':
        return classes.warningIcon;
      case 'error':
        return classes.errorIcon;
      default:
        return classes.defaultIcon;
    }
  };

  const getIcon = () => {
    switch (icon) {
      case 'info':
        return <InfoFilledIcon />;
      case 'error':
        return <ErrorFillIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'success':
        return <SuccessFillIcon />;
      default:
        return null;
    }
  };
  const alertIcon = getIcon();

  return (
    <Box
      className={clsx(getColorClass(), {
        [classes.root]: true,
        [classes.fullWidth]: fullWidth,
        [className]: !!className,
      })}
      data-testid={testId}
    >
      <Box className={classes.notificationInner}>
        {bannerImg && <Box className={classes.imageWrapper}>{bannerImg}</Box>}
        {alertIcon && (
          <Box className={classes.iconWrapper}>
            <Box className={clsx(classes.iconRoot, getIconColorClass())}>
              {alertIcon}
            </Box>
          </Box>
        )}
        <Box
          className={clsx(classes.notificationContent, {
            [classes.fullWidth]: !bannerImg && !alertIcon,
          })}
        >
          {title && (
            <Typography gutterBottom variant="h6">
              {title}
            </Typography>
          )}
          {onClose && (
            <IconButton
              size="small"
              className={classes.closeButton}
              onClick={onClose}
              data-cyid="notification-close-button"
            >
              <CloseIcon className={classes.closeIcon} />
            </IconButton>
          )}
          <Box>{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Notification;
