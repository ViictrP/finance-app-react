import { useEffect, useState } from 'react'
const HomePage = () => {
  const [items, setItems] = useState<Array<number>>([])

  useEffect(() => {
    const arr = []
    for (let i = 0; i < 100; i++) {
      arr.push(i)
    }
    setItems(arr)
  }, [])

  return (
    <div className="pb-12">
      {items.map((i) => (
        <p>Item: {i}</p>
      ))}
    </div>
  )
}

export default HomePage
