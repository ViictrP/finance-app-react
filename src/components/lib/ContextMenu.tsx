import React, { ReactNode, useEffect, useState } from 'react';

interface ContextManuProps {
  show: boolean;
  showChevron?: boolean;
  position: {x: number, y: number};
  children: ReactNode;
}

const ContextMenu = ({ show, showChevron, children, position }: ContextManuProps) => {
  const [_position, setPosition] = useState({ x: 0, y: 0 });
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    setShouldShow(show);
    setPosition(position);
  }, [show, position]);

  if (!shouldShow) {
    return <></>;
  }

  return (
    <div className={`context-menu flex flex-col items-center gap-[1px] ${showChevron ? 'context-menu-chevron' : ''}`}
         style={{ left: _position.x - 100, top: _position.y - 110 }}>
      {children}
    </div>
  );
};

export default ContextMenu;
