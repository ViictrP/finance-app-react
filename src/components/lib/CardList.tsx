import Card from './Card'
import { useEffect, useState } from 'react'

interface CardItem {
  key: string
  header: string
  content: string
  footer: string
}

interface CardListGroupProps {
  property: keyof CardItem
}

interface CardListProps {
  content: CardItem[],
  icon: any,
  group?: boolean,
  groupProp?: CardListGroupProps
}

const CardList = ({ content, icon, group, groupProp }: CardListProps) => {
  const [_content, setContent] = useState<CardItem[]>(content)

  useEffect(() => setContent(content), [content])

  return (
    <>
      {_content.map(item => (
        <Card key={item.key}>
          {icon}
          <div className="w-full flex flex-col items-start">
            <p className="text-xs">{item.header}</p>
            <div className="w-full mt-3 flex flex-row justify-between">
              <p className="text-xs font-bold">{item.content}</p>
              <p className="text-sm text-orange-300">{item.footer}</p>
            </div>
          </div>
        </Card>
      ))}
    </>
  )
}

export default CardList
