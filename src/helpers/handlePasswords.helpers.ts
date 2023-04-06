import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto-js';

/**
 * @param password string password to hash
 * @returns hast converted string
 */
export const encryptPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

/**
 * @param password string password
 * @param hash string password to compare
 * @returns boolean if password ir correct
 */
export const comparePassword = (password: string, hash: string): boolean => {
  const isValidPassword = bcrypt.compareSync(password, hash);
  return isValidPassword;
};

/**
 * @param data string data to encrypt
 * @returns string data encrypted
 */
export const encryptData = (data: string): string => {
  const encrypted = crypto.AES.encrypt(
    data,
    process.env.SECRET_KEY_PASSWORD!,
  ).toString();
  return encrypted;
};

/**
 * @param data string a decrypt
 * @returns string decrypted
 */
export const decryptData = (data: string): string => {
  const bytes = crypto.AES.decrypt(data, process.env.SECRET_KEY_PASSWORD!);
  const decrypted = bytes.toString(crypto.enc.Utf8);
  return decrypted;
};
