import { request } from 'umi';

interface Captcha {
  mobile: string;
}
interface Base {
  mobile: string;
  captcha: string;
}
type Login = Base;
interface Github {
  code: string;
}
interface BindUser {
  mobile: string;
  captcha: string;
  oauthType: 'github';
  oauthUserDetail: any;
}

const auth = {
  captcha: async (data: Captcha): Promise<number> => {
    const res = await request('/auth/captcha', { method: 'get', params: data });
    return res;
  },
  verify: async (data: Base): Promise<boolean> => {
    const res = await request('/auth/verify', { method: 'get', params: data });
    return res;
  },
  login: async (data: Login): Promise<boolean> => {
    const res = await request('/auth/login', { method: 'post', data });
    return res;
  },
  github: async (data: Github): Promise<boolean> => {
    const res = await request('/auth/github', { method: 'post', data });
    return res;
  },
  bindUser: async (data: BindUser): Promise<boolean> => {
    const res = await request('/auth/bindUser', { method: 'post', data });
    return res;
  },
};

export default auth;
