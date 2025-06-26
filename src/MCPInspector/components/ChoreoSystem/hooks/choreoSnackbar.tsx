/*
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.com). All Rights Reserved.
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

import { ReactNode } from 'react';
import { useSnackbar } from 'notistack';
import Notification, {
  NotificationProps,
} from '../Notification/Notification';
import SnackbarCloseButton from '../Snackbar/SnackbarCloseButton';

interface ChoreoSnackbarOptions {
  variant?: NotificationProps['color'];
  icon?: NotificationProps['icon'];
  closeIcon?: boolean;
}

export const useChoreoSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const showSnackbar = (
    message: ReactNode,
    options?: ChoreoSnackbarOptions
  ) => {
    enqueueSnackbar(
      <Notification
        testId="snackbar-notification"
        icon={options?.icon}
        color={options?.variant}
      >
        {message}
      </Notification>,
      {
        action:
          options?.closeIcon &&
          ((snackbarKey) => (
            <SnackbarCloseButton
              snackbarKey={snackbarKey}
              testId="chore-snackbar-close"
            />
          )),
      }
    );
  };
  return showSnackbar;
};

export default useChoreoSnackbar;
