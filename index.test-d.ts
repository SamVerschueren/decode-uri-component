import {expectType} from 'tsd';
import decodeUriComponent from './index.js';

expectType<string>(decodeUriComponent('st%C3%A5le'));
