import { Box, Tooltip, Typography } from '@material-ui/core';
import { Clear } from './ChoreoSystem/Icons/generated';
import Button from './ChoreoSystem/Button/Button';
import IconButton from './ChoreoSystem/IconButton/IconButton';
import { useStyles } from './style';

type ListPaneProps<T> = {
  items: T[];
  listItems: () => void;
  clearItems: () => void;
  setSelectedItem: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
  title: string;
  buttonText: string;
  isButtonDisabled?: boolean;
};

const ListPane = <T extends object>({
  items,
  listItems,
  clearItems,
  setSelectedItem,
  renderItem,
  title,
  buttonText,
  isButtonDisabled,
}: ListPaneProps<T>) => {
  const classes = useStyles();

  return (
    <Box className={classes.resultSection}>
      <Box className={classes.resultSectionHeader}>
        <Typography variant="h4">{title}</Typography>
        <Box display="flex" gridGap={12}>
          <Button
            onClick={listItems}
            disabled={isButtonDisabled}
            testId='show-tool'
            size="small"
          >
            {buttonText}
          </Button>
          <Tooltip title="Clear All Tools">
            <IconButton
              size="small"
              variant="link"
              color="error"
              onClick={clearItems}
              testId="clear-tools"
            >
              <Clear fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <div className={classes.resultSectionBody}>
        <div className={classes.itemsContainer}>
          {items.map((item, index) => (
            <div
              className={classes.item}
              onClick={() => setSelectedItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedItem(item);
                }
              }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default ListPane;
