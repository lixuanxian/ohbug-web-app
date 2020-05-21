import React from 'react';
import { Row, Col, Typography, Card, Statistic } from 'antd';
import type { Event, Issue } from 'umi';
import clsx from 'clsx';

import Image from '@/components/Image';

import styles from './Title.less';

interface TrendProps {
  data: number;
}
const Trend: React.FC<TrendProps> = ({ data }) => {
  const type = data <= 0 ? 'down' : 'up';
  const classes = clsx(styles.trend, {
    [styles.up]: type === 'up',
    [styles.down]: type === 'down',
  });
  const value = `${type === 'up' ? '+' : ''}${data * 100}%`;
  return <div className={classes}>{value}</div>;
};

interface TitleProps {
  event: Event<any>;
  issue: Issue;
}
const Title: React.FC<TitleProps> = ({ event, issue }) => {
  return (
    <Row className={styles.root} gutter={24}>
      <Col className={styles.left} xs={24} sm={24} md={18}>
        <Typography className={styles.content}>
          <Typography.Title>{event.type}</Typography.Title>
          {event?.detail?.message && (
            <Typography.Text ellipsis strong style={{ fontSize: 16 }}>
              {event.detail.message}
            </Typography.Text>
          )}
          {event?.detail?.filename && (
            <Typography.Paragraph ellipsis strong style={{ fontSize: 16 }}>
              {event.detail.filename}
            </Typography.Paragraph>
          )}
        </Typography>
        <Image
          className={styles.figure}
          src={require('@/static/images/issue_title_figure.png')}
          alt="issue_title_figure"
        />
      </Col>

      <Col className={styles.right} xs={24} sm={24} md={6}>
        <Card size="small" style={{ width: '100%' }}>
          <div className={styles.countCard}>
            <Statistic title="EVENTS" value={issue.events_count} />
            <Trend data={0.15} />
          </div>
        </Card>
        <Card size="small" style={{ width: '100%' }}>
          <div className={styles.countCard}>
            <Statistic title="USERS" value={issue.users_count} />
            <Trend data={-0.04} />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default Title;