import React from 'react';
import { Statistic, Tooltip, Skeleton } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'umi';

import type { RootState } from '@/interfaces';

import styles from './View.less';

type Type = 'PV' | 'UV';
interface ViewProps {
  title: React.ReactNode;
  type: Type;
}

const View: React.FC<ViewProps> = ({ title, type }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const start = dayjs().subtract(1, 'day').toISOString();
    const end = dayjs().startOf('hour').toISOString();
    dispatch({ type: `view/get${type}`, payload: { start, end } });
  }, [dispatch, type]);

  const data = useSelector<RootState, number | undefined>((state) => state.view[type]);
  const loading = useSelector<RootState, boolean>(
    (state) => state.loading.effects[`view/get${type}`]!,
  );

  return (
    <div className={styles.root}>
      <Skeleton loading={loading}>
        <Statistic
          title={
            <div className={styles.title}>
              <span>今日 {title}</span>
              <Tooltip title={`当前 Project 下今日 ${title} 总数`}>
                <InfoCircleOutlined className={styles.icon} />
              </Tooltip>
            </div>
          }
          value={data}
          valueStyle={{ fontSize: 30 }}
        />
      </Skeleton>
    </div>
  );
};

export default View;
