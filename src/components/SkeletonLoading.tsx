import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonLoadingProps {
  width?: number;
  height?: number;
}

const SkeletonLoading = ({ width, height }: SkeletonLoadingProps) => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444" width={width ?? 60} height={height}>
      <Skeleton />
    </SkeletonTheme>
  );
};

export default SkeletonLoading;
