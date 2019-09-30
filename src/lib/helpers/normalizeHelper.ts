import { v4 } from 'uuid';
import { Resource } from '../models/resource';

type Dirty = Record<any, any>;
type Clean = Record<string, any>;

const isNumerical = (key: any) => {
  key = key - 0;
  return key === key;
};

const camelize = (key: string) => {
  if (isNumerical(key)) {
    return key.toString();
  }

  // tslint:disable-next-line: variable-name
  key = key.replace(/[\-_\s]+(.)?/g, (_match, chr) =>
    chr ? chr.toUpperCase() : ''
  );

  return key.substr(0, 1).toLowerCase() + key.substr(1);
};

export const camelizeKeys = (obj: Dirty): Clean => {
  const nextState = {};
  Object.keys(obj).forEach(k => {
    nextState[camelize(k)] = obj[k]
      ? typeof obj[k] === 'object' && obj[k].constructor.name === 'Object'
        ? camelizeKeys(obj[k])
        : obj[k]
      : null;
  });
  return nextState;
};

export const scrubPayload = <T extends Clean>(payload: T): Resource => {
  const key: string = payload.nodeId || payload.id || payload.key || v4();

  return { ...payload, key };
};

export const normalizePayload = (payload: Dirty | Dirty[]): Clean | Clean[] => {
  if (Array.isArray(payload)) {
    return (payload as Dirty[]).map(r => ({
      ...scrubPayload(camelizeKeys(r))
    })) as Clean[];
  }

  return scrubPayload(camelizeKeys(payload)) as Clean;
};
