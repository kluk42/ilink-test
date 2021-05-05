import {v4 as uuid} from 'uuid';

import {QuoteContainer, Word, WordWrapper} from './styles';

import {Props} from './types';

const Quote: Props = ({quote}) => {
    const words = quote.split(' ');
  return (
        <QuoteContainer>
            {words.map(w => {
                return (
                    <WordWrapper key={uuid()}>
                        <Word>
                            {w}
                        </Word>
                    </WordWrapper>
                )
            })}
        </QuoteContainer>
  );
}

export default Quote;
