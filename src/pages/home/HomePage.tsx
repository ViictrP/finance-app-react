import { Gear, MagnifyingGlass, ShoppingBag } from 'phosphor-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import CardList from '../../components/lib/CardList'
import Input from '../../components/lib/form/Input'

interface BalanceContainer {
  width: number
  height: number
}

const HomePage = () => {
  const [balanceContainer, setBalanceContainer] = useState<BalanceContainer>()
  const [cards, setCards] = useState([
    {
      key: '1',
      header: 'outras transferências',
      content: 'pix transf victor 18/06',
      footer: '- R$ 300,00',
    },
    {
      key: '2',
      header: 'outras transferências',
      content: 'pix transf binho 18/06',
      footer: '- R$ 300,00',
    },
    {
      key: '3',
      header: 'outras transferências',
      content: 'pix transf nathalia 18/06',
      footer: '- R$ 300,00',
    },
    {
      key: '4',
      header: 'outras transferências',
      content: 'pix transf theo 18/06',
      footer: '- R$ 300,00',
    },
  ])
  const [filteredCards, setFilteredCards] = useState<typeof cards>([])
  const data = [
    {
      name: 'Jan',
      pv: 2400,
    },
    {
      name: 'Fev',
      pv: 1398,
    },
    {
      name: 'Mar',
      pv: 9800,
    },
    {
      name: 'Mai',
      pv: 3908,
    },
    {
      name: 'Jun',
      pv: 4800,
    },
    {
      name: 'Jul',
      pv: 3800,
    },
    {
      name: 'Ago',
      pv: 4300,
    },
  ]

  useEffect(() => {
    const div = document.getElementById('balance-container')
    const container: BalanceContainer = {
      width: div!.clientWidth + 30 ?? 0,
      height: 100,
    }
    setBalanceContainer(container)
    setFilteredCards(cards)
  }, [])

  const filterTransactions = (searchValue: string) => {
    if (searchValue) {
      const _filteredCards = cards.filter((card) =>
        card.content
          .toLowerCase()
          .includes(searchValue.toLowerCase()),
      )
      setFilteredCards(_filteredCards)
    } else {
      setFilteredCards(cards)
    }
  }

  return (
    <div className="pt-8 px-5 pb-12 overflow-x-hidden">
      <Header />
      <div
        id="content"
        className="block mt-10 w-full h-auto bg-zinc-900 rounded-lg"
      >
        <div id="balance-container" className="p-4 w-full">
          <div className="w-full flex flex-row items-center justify-between">
            <p className="text-lg">saldo disponível</p>
            <button title="gear" type="button">
              <Gear size={24} weight="fill" />
            </button>
          </div>
          <h1 className="text-3xl text-emerald-500 font-semibold">
            R$ 3.423,18
          </h1>
        </div>
        <div id="charts">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minHeight={balanceContainer?.height}
            minWidth={balanceContainer?.width}
          >
            <AreaChart
              width={balanceContainer?.width}
              height={balanceContainer?.height}
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#047857" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#18181b" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <Tooltip />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4 w-full text-right">
          <p className="text-md">gasto total • jun</p>
          <p className="text-xl text-orange-300 font-semibold">R$ 7.364,50</p>
        </div>
      </div>
      <div id="transitions" className="mt-10">
        <h1 className="text-2xl font-bold my-5">Transações</h1>
        <Input
          placeholder="buscar transações..."
          icon={<MagnifyingGlass />}
          onChange={filterTransactions}
        />
        <CardList
          content={filteredCards}
          icon={<ShoppingBag size="30" className="mr-4 ml-1" weight="fill" />}
        />
      </div>
    </div>
  )
}

export default HomePage
