import NodeCache from 'node-cache';

export function app_cache(ttl?: number) {
	return new NodeCache({ stdTTL: ttl || 0, deleteOnExpire: true, useClones: false });
}
