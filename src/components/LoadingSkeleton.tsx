import React from 'react';
import { Skeleton, SkeletonText } from '@gluestack-ui/themed';

const LoadingSkeleton = () => (
  <Skeleton width="100%" height={80} borderRadius="$lg" marginBottom="$4">
    <SkeletonText fontSize="$lg" />
  </Skeleton>
);

export default LoadingSkeleton;
