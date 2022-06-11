import React, { useEffect, useState } from 'react';

const Home = () => {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const arr: any[] = [];
    for (let i = 0; i < 100; i++) {
      arr.push(`${i}`);
    }
    setItems(arr);
  });

  return (
    <div className='container'>
      <ul>
        {items.map(item => <li>`${item}`</li>)}
      </ul>
    </div>
  );
};

export default Home;
