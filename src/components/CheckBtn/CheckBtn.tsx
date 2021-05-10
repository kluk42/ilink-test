import {Props} from './types';

import {Button} from './styles';

const CheckBtn: Props = ({isWrong, handleClick, isDisabled}) => {
  return (
        <Button
            active={!isDisabled}
            isWrong={isWrong}
            onClick={handleClick}
            disabled={isDisabled}
        >
            Check
        </Button>
  );
}

export default CheckBtn;
