/* eslint-disable react/jsx-props-no-spreading */
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
import {
  Box,
  Checkbox as MUICheckbox,
  CheckboxProps as MUICheckboxProps,
  FormControlLabel,
} from '@material-ui/core';
import clsx from 'clsx';
import { useStyles } from './Checkbox.style';

interface CheckboxProps extends MUICheckboxProps {
  label?: React.ReactNode;
  testId: string;
}

function Checkbox(props: CheckboxProps, ref: React.Ref<any>) {
  const classes = useStyles();
  const { label, value, disabled, testId, ...rest } = props;
  return (
    <Box className={classes.checkboxButton}>
      <FormControlLabel
        className={clsx({
          [classes.checkboxLabelRoot]: true,
          [classes.checkboxLabelDisabled]: disabled,
          [classes.checkboxNoLabel]: !label,
        })}
        disabled={disabled}
        value={value}
        control={
          <MUICheckbox
            disableFocusRipple
            disableRipple
            disableTouchRipple
            ref={ref}
            data-cyid={`${testId}-check-box`}
            {...rest}
            classes={{
              root: classes.root,
              checked: classes.checked,
              disabled: classes.disabled,
            }}
          />
        }
        label={label}
      />
    </Box>
  );
}

export default React.forwardRef(Checkbox);
