import React from 'react';
import styled from 'styled-components';

interface Props {
  buckets: number;
  volume: number;
  speaking: boolean;
}

interface ContainerProps {
  buckets: number;
}

const Container = styled.div(({ buckets }: ContainerProps) => ({
  width: '25px',
  display: 'grid',
  gridTemplateRows: `repeat(${buckets}, 1fr)`,
  gridRowGap: '2px'
}));

interface BucketProps {
  filled: boolean;
  speaking: boolean;
}

const Bucket = styled.div(({ filled, speaking }: BucketProps) => ({
  border: '1px solid white',
  borderRadius: '4px',
  backgroundColor: filled ? (speaking ? 'green' : 'white') : ''
}));

const VolumeMeter: React.SFC<Props> = ({ buckets, volume, speaking }) => {
  const bucketSize = 100 / buckets;
  return (
    <Container buckets={buckets}>
      {Array.from(Array(buckets)).map((_, i) => (
        <Bucket
          key={i}
          filled={volume >= (buckets - i) * bucketSize}
          speaking={speaking}
        />
      ))}
    </Container>
  );
};

export default VolumeMeter;
