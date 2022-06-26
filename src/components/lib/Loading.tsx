import { CircleNotch } from 'phosphor-react';

interface LoadingPros {
  showText: boolean;
  text?: string;
  size?: number;
  fullscreen?: boolean;
}

const Loading = ({ showText, text, size, fullscreen }: LoadingPros) => {
  return (
    <div className={`${fullscreen ? 'absolute left-0 right-0 m-auto bottom-[calc(100vh*0.5)]' : ''} flex flex-row gap-2 items-center justify-center`}>
      <CircleNotch size={size} weight="bold" className="animate-spin" />
      {showText && <span>{text ?? 'loading...'}</span>}
    </div>
  );
};

export default Loading;
