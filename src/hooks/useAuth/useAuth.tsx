import React from 'react';
import { useLocation, useDispatch, useSelector, history } from 'umi';
import type { UserModelState, OrganizationModelState } from 'umi';

import type { RootState } from '@/interfaces';
import { useMount } from '@/hooks';
import { getGithub } from '@/utils';
import { InviteModelState } from '@/models/invite';

interface UseAuth {
  isLogin: boolean;
}
/**
 * 用于鉴定当前是否登录
 * 先进入 isLogin 页
 * 未登录直接跳转到登录页
 * 已登录则获取用户相关信息 获取完毕后退出 isLogin
 *
 */
const useAuth = (): UseAuth => {
  const dispatch = useDispatch();
  const github = getGithub();
  const { pathname } = useLocation();

  // 根据 cookie 内是否含有 id 判断登录态
  const auth = Boolean(github.id);
  const [isLogin, setLogin] = React.useState(false);
  const user = useSelector<RootState, UserModelState>((state) => state.user);
  const organization = useSelector<RootState, OrganizationModelState['current']>(
    (state) => state.organization.current,
  );
  const invite = useSelector<RootState, InviteModelState['current']>(
    (state) => state.invite.current,
  );

  useMount(() => {
    async function getUserInfo(): Promise<void> {
      try {
        if (!Object.keys(user).length) {
          // 没有 user 信息 需要获取
          await dispatch({ type: 'user/get' });
        } else if (pathname === '/login') {
          // 已经有了 user 信息
          history.replace('/');
        } else if (!organization) {
          history.replace('/create-organization');
        }
      } catch (error) {
        history.replace('/login');
      }
    }

    async function run(): Promise<void> {
      if (!auth) {
        // 未登录状态
        setLogin(false);

        if (pathname !== '/login') {
          history.replace('/login');
        }
      } else {
        // 登录状态
        await getUserInfo();

        if (invite) {
          await dispatch({
            type: 'invite/bind',
          });
        }

        setLogin(true);
      }
    }

    run();
  });

  return { isLogin };
};

export default useAuth;
