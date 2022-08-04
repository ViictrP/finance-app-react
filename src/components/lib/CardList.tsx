import Card from './Card';
import { useCallback, useEffect, useState } from 'react';

export interface CardItem {
  key: string;
  header: string;
  content: string;
  footer: string;
}

interface CardListGroupProps {
  property: keyof CardItem;
}

interface CardListProps {
  content: CardItem[];
  icon: any;
  group?: boolean;
  groupProp?: CardListGroupProps;
  placeholderElement?: any;
  onItemClick?: (key: string) => void;
}

const CardList = ({ content, onItemClick, icon }: CardListProps) => {
  const [_content, setContent] = useState<CardItem[]>(content);

  const onItemClickHandler = useCallback((key: string) => {
    onItemClick && onItemClick(key);
  }, [onItemClick]);

  useEffect(() => setContent(content), [content]);

  return (
    <>
      {_content.map((item) => (
        <Card key={item.key} onClick={() => onItemClickHandler(item.key)}>
          {icon}
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-row items-start justify-between">
              <p className="text-xs">{item.header}</p>
              <p className="text-md text-orange-300 font-bold">{item.footer}</p>
            </div>
            <p className="text-md font-bold">{item.content}</p>
          </div>
        </Card>
      ))}
    </>
  );
};

export default CardList;
