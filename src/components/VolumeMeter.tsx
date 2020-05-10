import React from 'react';
import styled, { css, keyframes } from 'styled-components';

interface Props {
  buckets: number;
  volume: number;
  speaking: boolean;
  loaded: boolean;
  noInput: boolean;
  requesting: boolean;
}

interface ContainerProps {
  buckets: number;
  loaded: boolean;
  noInput: boolean;
  requesting: boolean;
}

const loading = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.div<ContainerProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.buckets}, 1fr);
  grid-column-gap: 2px;
  ${props =>
    (!props.loaded && !props.noInput) || props.requesting
      ? css`
          animation: ${loading} 0.5s infinite;
        `
      : ''}
`;

interface BucketProps {
  filled: boolean;
  speaking: boolean;
}

const Bucket = styled.div<BucketProps>`
  border: 1px solid white;
  border-radius: 4px;
  height: 6px;
  background-color: ${props => (props.filled ? (props.speaking ? 'green' : '#444') : '#ccc')};
`;

const VolumeMeter: React.SFC<Props> = ({
  buckets,
  volume,
  speaking,
  loaded,
  noInput,
  requesting
}) => {
  const bucketSize = 100 / buckets;
  return (
    <Container buckets={buckets} noInput={noInput} loaded={loaded} requesting={requesting}>
      {Array.from(Array(buckets)).map((_, i) => (
        <Bucket
          key={i}
          filled={volume > 0 && volume <= (buckets - i) * bucketSize}
          speaking={speaking}
        />
      ))}
    </Container>
  );
};

export default VolumeMeter;
