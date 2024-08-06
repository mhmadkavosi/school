import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { createHash } from 'crypto';

export enum HashingAlgorithms {
	sha1 = 'sha1',
	sha256 = 'sha256'
}

/**
 * Generate Hashed Code such as: Tables public_id and access_address
 * @info sha1 :    40 char
 * @info sha256 :  64 char
 * @info sha512 :  128 hexadecimal characters
 * return {string}
 */
/**
 * Generate public id.
 * @returns {string} public id.
 */
export const generate_public_id = (): string => {
	return createHash(HashingAlgorithms.sha1).update(uuid()).digest('hex');
};

/**
 * Generate random secure access address using provide hash function.
 * @returns {Promise<string>} - access_address
 */
export const generate_access_address = (): string => {
	const hashDigest = uuid() + new Date().getTime();
	return createHash(HashingAlgorithms.sha1).update(hashDigest).digest('hex');
};

/**
 * Generate password hash
 * @returns {string} - hash password
 */
export const hash_password = (raw_password: string, hashing_rounds = 12): string => {
	return bcrypt.hashSync(raw_password, hashing_rounds);
};

/**
 * Compare raw password and has password hash
 * @returns {Promise<boolean>} - Compare result
 */
export const validate_password = async (raw_password: string, hashed_password: string): Promise<boolean> => {
	return await bcrypt.compare(raw_password, hashed_password);
};
