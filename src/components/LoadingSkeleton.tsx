import React from 'react';
import { Skeleton, SkeletonText } from '@gluestack-ui/themed';

const LoadingSkeleton = () => (
  <Skeleton className="w-full h-20 rounded-lg mb-4">
    <SkeletonText className="text-lg" />
  </Skeleton>
);

export default LoadingSkeleton;
