import React, { useMemo } from 'react'
import { View, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native'
import Colors from '../../common/Colors';
import DeviceInfo from 'react-native-device-info';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export enum BottomTab {
  Transactions,
  Add,
  QR,
  More,
}

export interface Props {
  tabBarZIndex?: number;
  onSelect: (tab: BottomTab) => void;
  selectedTab: BottomTab | null;
}

const CustomBottomTabs: React.FC<Props> = ({
  tabBarZIndex = 1,
  onSelect,
  selectedTab,
}: Props) => {
  return (
    <View style={{ ...styles.bottomTabBarContainer, zIndex: tabBarZIndex }}>
      {tabItems.map((tabItem, index) => {
        return (
          <Tab
            key={index}
            tabItem={tabItem}
            isActive={selectedTab == tabItem.tab}
            onPress={() => onSelect(tabItem.tab)}
          />
        );
      })}
    </View>
  )
}

export const TAB_BAR_HEIGHT = hp('12%');

const styles = StyleSheet.create({

  bottomTabBarContainer: {
    backgroundColor: Colors.white,
    justifyContent: 'space-evenly',
    display: 'flex',
    marginTop: 'auto',
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT,
    alignItems: 'center',
    borderLeftColor: Colors.borderColor,
    borderLeftWidth: 1,
    borderRightColor: Colors.borderColor,
    borderRightWidth: 1,
    borderTopColor: Colors.borderColor,
    borderTopWidth: 1,
    paddingBottom: DeviceInfo.hasNotch() ? hp('4%') : 0,
  },

  tabBarTabView: {
    padding: wp('5%'),
  },

  tab: {
    padding: 7,
  },

  tabBarImage: {
    width: 21,
    height: 21,
    resizeMode: 'contain',
  },
})

export default CustomBottomTabs
