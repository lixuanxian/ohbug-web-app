import React from 'react';
import { DatePicker } from 'antd';
import { useDispatch } from 'umi';
import dayjs from 'dayjs';

import { useMount } from '@/hooks';

const today = [dayjs().subtract(23, 'hour'), dayjs()];
const twoWeeks = [dayjs().subtract(13, 'day'), dayjs()];
const defaultValue = twoWeeks;
const ranges = {
  当日: today,
  近两周: twoWeeks,
};

const TimePicker: React.FC = () => {
  const dispatch = useDispatch();

  useMount(() => {
    dispatch({
      type: 'issue/searchIssues',
      payload: {
        page: 0,
        start: defaultValue[0].toISOString(),
        end: defaultValue[1].toISOString(),
      },
    });
  });

  const handleTimeChange = React.useCallback((dates: any) => {
    const [start, end] = dates;
    dispatch({
      type: 'issue/searchIssues',
      payload: {
        page: 0,
        start: start.toISOString(),
        end: end.toISOString(),
      },
    });
  }, []);

  return (
    <DatePicker.RangePicker
      showTime
      defaultValue={defaultValue as any}
      ranges={ranges as any}
      onChange={handleTimeChange}
    />
  );
};

export default TimePicker;
