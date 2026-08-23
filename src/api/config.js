const DEFAULT_API_BASE_URL = 'https://ieee-back.vercel.app/';

export const API_BASE_URL = (process.env.REACT_APP_API_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, '');
export const API_URL = `${API_BASE_URL}/api`;
