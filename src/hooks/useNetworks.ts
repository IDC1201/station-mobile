import { useMemo } from 'react'

import useTerraAssets from 'lib/hooks/useTerraAssets'
import { ChainOptions } from 'lib'
import { NetworkEnum } from 'types'

const defaultNetworks: Record<NetworkEnum, ChainOptions> = {
  mainnet: {
    name: NetworkEnum.mainnet,
    chainID: 'columbus-5',
    lcd: 'https://lcd.terra.dev',
    fcd: 'https://fcd.terra.dev',
    mantle: 'https://mantle.terra.dev',
    walletconnectID: 1,
  },
  testnet: {
    name: NetworkEnum.testnet,
    chainID: 'pisco-1',
    lcd: 'https://pisco-lcd.terra.dev',
    fcd: 'https://pisco-fcd.terra.dev',
    mantle: 'https://pisco-mantle.terra.dev',
    walletconnectID: 0,
  },
}


const useNetworks = (): {
  networks: Record<NetworkEnum, ChainOptions>
} => {
  const { data } = useTerraAssets<Record<NetworkEnum, ChainOptions>>(
    'chains.json'
  )

  const networks: Record<NetworkEnum, ChainOptions> = useMemo(() => {
    const getOptions = (net: NetworkEnum): ChainOptions => {
      return { ...defaultNetworks[net], ...data?.[net] }
    }

    return {
      [NetworkEnum.mainnet]: getOptions(NetworkEnum.mainnet),
      [NetworkEnum.testnet]: getOptions(NetworkEnum.testnet),
    }
  }, [data])

  return {
    networks,
  }
}

export default useNetworks
