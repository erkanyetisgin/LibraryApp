import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Icon from '@/assets/icons';
import { hp } from '@/helpers/common';
import { theme } from '@/constants/theme';



export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const icon: { [key: string]: (props: any) => JSX.Element } = {
        home: (props: any) =>  <Icon name='home' size={25} colors={ '#000000'} {...props} />,
        books: (props: any) =>  <Icon name='book' size={25} colors={ '#000000'} {...props} />,
        authors: (props: any) =>  <Icon name='pen' size={25} colors={ '#000000'} {...props} />,
        profile: (props: any) =>  <Icon name='user' size={25} colors={ '#000000'} {...props} />,
    }
  
    return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
           {icon[route.name]({fill: isFocused ? '#6495ED': '#ffff'})}
            <Text style={{ color: isFocused ? '#6495ED' : '#000000' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: hp(2),
    paddingVertical: hp(2),
    borderRadius: theme.radius.xxl,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: theme.radius.md,
    shadowOpacity: 0.1,


  },
    tabbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', 
        gap: 5,
    },
})