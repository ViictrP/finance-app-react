import { Gear } from 'phosphor-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'

interface BalanceContainer {
  width: number;
  height: number;
}

const HomePage = () => {
  const [balanceContainer, setBalanceContainer] = useState<BalanceContainer>()
  const data = [
    {
      'name': 'Jan',
      'pv': 2400,
    },
    {
      'name': 'Fev',
      'pv': 1398,
    },
    {
      'name': 'Mar',
      'pv': 9800,
    },
    {
      'name': 'Mai',
      'pv': 3908,
    },
    {
      'name': 'Jun',
      'pv': 4800,
    },
    {
      'name': 'Jul',
      'pv': 3800,
    },
    {
      'name': 'Ago',
      'pv': 4300,
    },
  ]

  useEffect(() => {
    const div = document.getElementById('balance-container')
    const container: BalanceContainer = {
      width: div!.clientWidth + 30 ?? 0,
      height: 100,
    }
    setBalanceContainer(container)
  }, [])

  return (
    <div className="pt-8 px-5 pb-12">
      <Header />
      <div className="flex flex-col items-start mt-5 w-full h-auto bg-zinc-900 rounded-lg">
        <div id="balance-container" className="px-5 py-2 w-full">
          <div className="w-full flex flex-row items-center justify-between">
            <p>saldo disponível</p>
            <button>
              <Gear size={18} weight="fill" />
            </button>
          </div>
          <h1 className="text-3xl text-emerald-500 font-semibold">R$ 10.787,68</h1>
        </div>
        <div id="charts">
          <ResponsiveContainer width="100%"
                               height="100%"
                               minHeight={balanceContainer?.height}
                               minWidth={balanceContainer?.width}>
            <AreaChart width={balanceContainer?.width}
                       height={balanceContainer?.height}
                       data={data}
                       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <Tooltip />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#82ca9d"
                strokeWidth={2}
                fill="#82ca9d"
              />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default HomePage
