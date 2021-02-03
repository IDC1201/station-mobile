import React, { ReactElement, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import _ from 'lodash'

// import Dashboard from '../screens/homeTab/Dashboard'
import Wallet from '../screens/walletTab/Wallet'
import Swap from '../screens/swapTab/Swap'

import { RootStack } from 'types/navigation'
import Staking from '../screens/stakingTab/Staking'
import { Text, Icon } from 'components'
import layout from 'styles/layout'
import { useAuth } from 'use-station/src'

export const INITIAL = 'Dashboard'

// const DashboardStack = (): ReactElement => (
//   <RootStack.Navigator initialRouteName={INITIAL}>
//     <RootStack.Screen
//       name={INITIAL}
//       component={Dashboard}
//       options={Dashboard.navigationOptions}
//     />
//   </RootStack.Navigator>
// )

const WalletStack = (): ReactElement => (
  <RootStack.Navigator initialRouteName="Wallet">
    <RootStack.Screen
      name="Wallet"
      component={Wallet}
      options={Wallet.navigationOptions}
    />
  </RootStack.Navigator>
)

const StakingStack = (): ReactElement => (
  <RootStack.Navigator initialRouteName="Staking">
    <RootStack.Screen
      name="Staking"
      component={Staking}
      options={Staking.navigationOptions}
    />
  </RootStack.Navigator>
)

const SwapStack = (): ReactElement => (
  <RootStack.Navigator initialRouteName="Swap">
    <RootStack.Screen
      name="Swap"
      component={Swap}
      options={Swap.navigationOptions}
    />
  </RootStack.Navigator>
)

const styles = StyleSheet.create({
  tabbar_text: {
    fontSize: 9,
    marginBottom: 3,
  },
})

/* routes */
const Tab = createBottomTabNavigator()

const tabScreenItemList: {
  name: string
  component: () => ReactElement
  label: string
  iconName: string
}[] = [
  // {
  //   name: 'Dashboard',
  //   component: DashboardStack,
  //   label: 'DASHBOARD',
  //   iconName: 'dashboard',
  // },
  {
    name: 'Wallet',
    component: WalletStack,
    label: 'WALLET',
    iconName: 'account-balance-wallet',
  },
  {
    name: 'Swap',
    component: SwapStack,
    label: 'SWAP',
    iconName: 'swap-horiz',
  },
  {
    name: 'Staking',
    component: StakingStack,
    label: 'STAKING',
    iconName: 'layers',
  },
]

const Tabs = (): ReactElement => {
  const { navigate } = useNavigation()
  const { user } = useAuth()
  useEffect(() => {
    if (_.isEmpty(user)) {
      navigate('AuthMenu')
    }
  }, [])

  const labelPosition =
    layout.getScreenWideType() === 'wide'
      ? 'beside-icon'
      : 'below-icon'
  return (
    <Tab.Navigator
      initialRouteName={INITIAL}
      tabBarOptions={{
        activeTintColor: '#2043B5',
        inactiveTintColor: '#C1C7D0',
        labelPosition,
      }}
    >
      {_.map(tabScreenItemList, (item, index) => (
        <Tab.Screen
          key={`tabScreenItemList-${index}`}
          name={item.name}
          component={item.component}
          options={(): BottomTabNavigationOptions => ({
            tabBarLabel:
              labelPosition === 'below-icon'
                ? ({ color }: { color: string }): ReactElement => (
                    <Text
                      style={[styles.tabbar_text, { color }]}
                      fontType={'bold'}
                    >
                      {item.label}
                    </Text>
                  )
                : item.label,
            tabBarIcon: ({ color }: any): ReactElement => (
              <Icon
                name={item.iconName}
                color={color}
                size={26}
                style={
                  labelPosition === 'below-icon' && { marginTop: 5 }
                }
              />
            ),
          })}
        />
      ))}
    </Tab.Navigator>
  )
}

export default Tabs
