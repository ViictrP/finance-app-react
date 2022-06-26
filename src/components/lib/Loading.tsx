import { CircleNotch } from 'phosphor-react';
import { useEffect, useState } from 'react';

interface LoadingPros {
  showText: boolean;
  text?: string;
  size?: number;
  fullscreen?: boolean;
}

const Loading = ({ showText, text, size, fullscreen }: LoadingPros) => {
  const [message, setMessage] = useState(text);

  useEffect(() => setMessage(text), [text]);

  return (
    <div className={`${fullscreen ? 'absolute left-0 right-0 m-auto bottom-[calc(100vh*0.5)]' : ''} flex flex-row gap-2 items-center justify-center`}>
      <CircleNotch size={size} weight="bold" className="animate-spin" />
      {showText && <span>{message ?? 'loading...'}</span>}
    </div>
  );
};

export default Loading;
