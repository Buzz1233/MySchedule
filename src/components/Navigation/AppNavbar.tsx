import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Schedule } from '../Schedule/Schedule';
import { NotesList } from '../Notes/NotesList';
import { Settings } from '../Settings/Settings';
import { Information } from '../Information/Information';
import { ProfileMenu } from './ProfileMenu';
import { MaterialIcons } from '@expo/vector-icons';

export const AppNavbar = () => {
    const window = useWindowDimensions();
    const Tab = createBottomTabNavigator();

    const tabBarIconStyle = (focused: boolean) => ({
        ...styles.icon,
        backgroundColor: focused ? '#4A4458' : '#211F26',
        marginTop: window.width <= 768 ? 7 : 0,
    });

    const tabBarLabelStyle = {
        ...styles.label,
        marginBottom: window.width <= 768 ? 7 : 0,
        marginLeft: window.width <= 768 ? 0 : 30,
    };

    const getTabScreenOptions = (label: string, iconName: any) => ({
        tabBarLabel: () => <Text style={tabBarLabelStyle}>{label}</Text>,
        tabBarIcon: ({ focused }) => (
            <View style={tabBarIconStyle(focused)}>
                <MaterialIcons name={iconName} color="white" size={24} />
            </View>
        ),
    });

    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#4F378B' },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: '#211F26',
                    borderTopWidth: 0,
                },
                headerRight: () => <ProfileMenu />,
            }}>
            <Tab.Screen
                name="Schedule"
                component={Schedule}
                options={{
                    headerTitle: 'Розклад',
                    ...getTabScreenOptions('Розклад', 'today'),
                }}
            />
            <Tab.Screen
                name="Notes"
                component={NotesList}
                options={{
                    headerTitle: 'Нотатки',
                    ...getTabScreenOptions('Нотатки', 'sticky-note-2'),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: false,
                    headerTitle: 'Налаштування',
                    ...getTabScreenOptions('Налаштування', 'settings'),
                }}
            />
            <Tab.Screen
                name="Information"
                component={Information}
                options={{
                    headerShown: false,
                    headerTitle: 'Інформація',
                    ...getTabScreenOptions('Інформація', 'info'),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    icon: {
        backgroundColor: '#332D41',
        width: 46,
        height: 24,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: 'white',
        fontSize: 11,
    },
});
