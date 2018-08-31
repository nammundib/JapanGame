export const OAUTH_LOGIN_URL = 'https://oauth.cmu.ac.th/v1/Authorize.aspx';
export const OAUTH_TOKEN_URL = 'https://oauth.cmu.ac.th/v1/GetToken.aspx';
export const OAUTH_CLIENT_ID = '9rqMCFuBdCAJJpK3pJbdse2qvuzTwBQRWj8Z02ej';
export const OAUTH_CLIENT_SECRET = 'kUYa77PQeKhqzXE4y9sjgMfNYWZzrWcxD23Ht2tx';
export const OAUTH_REDIRECT_URI = 'https://jap-api-uat.herokuapp.com';
export const OAUTH_SCOPE = 'cmuitaccount.basicinfo'; 
const CRYPTO_KEY = 'A5178B6A965AACF3CD60B07A15061719';
export const SERVER = 'https://jap-api-uat.herokuapp.com';
import * as crypto from 'crypto-js';

export function getOAuthAuthenUrl() {
  let backUrl = window.location.origin + '%2F%23%2Flogin'
  return `${OAUTH_LOGIN_URL}?response_type=code&client_id=${OAUTH_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&scope=${OAUTH_SCOPE}&state=${backUrl}`;
}
export function getOAuthAuthenUrlMobile() {
  let mobileBackUrl = 'mobile'
  return `${OAUTH_LOGIN_URL}?response_type=code&client_id=${OAUTH_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URI}&scope=${OAUTH_SCOPE}&state=${mobileBackUrl}`;
}
