import compose from 'compose-function';
import { withRouter } from './with-router';
import { withQuery } from './with-query';
import { withChakra } from './with-chakra';

export const withProviders = compose(withRouter, withQuery, withChakra);
