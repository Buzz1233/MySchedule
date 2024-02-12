import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import Bell from '../../../assets/bell.png';
import CrossedOutCall from '../../../assets/CrossedOutCall.png';
import Arrow from '../../../assets/arrow_drop_down.png';
import Reminder from './Reminder';
import { useNavigation } from '@react-navigation/native';

const DropDown = ({ lesson }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [arrowRotation, setArrowRotation] = useState(0);
    const [reminderVisible, setReminderVisible] = useState(false);
    const [isDismissedReminder, setDismissedReminder] = useState(false);

    const navigation = useNavigation();
    const window = useWindowDimensions();

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
        setArrowRotation(arrowRotation === 0 ? 180 : 0);
    };

    const showReminderModal = () => {
        if (!isDismissedReminder) setReminderVisible(true);
    };

    const hideReminderModal = () => {
        setReminderVisible(false);
    };

    const buttonState = () => {
        setDismissedReminder(!isDismissedReminder);
        hideReminderModal();
    };

    const updateReminderStatus = () => {
        setDismissedReminder(!isDismissedReminder);
        hideReminderModal();
        if (!isDismissedReminder) showReminderModal();
        else hideReminderModal();
    };

    const maxCharacters = window.width < 450 ? 30 : lesson.title.length;

    return (
        <View style={styles.container}>
            <Pressable onPress={toggleDropdown}>
                <View style={styles.title}>
                    <View>
                        <Text style={{ ...styles.buttonText, fontWeight: '500' }}>
                            {lesson.title.length > maxCharacters ? lesson.title.slice(0, 30) + '...' : lesson.title}
                        </Text>
                        <Text style={{ color: '#CAC4D0', fontSize: 12 }}>{lesson.typeOfLesson}</Text>
                    </View>
                    <Image source={Arrow} style={{ ...styles.arrow, transform: [{ rotate: `${arrowRotation}deg` }] }} />
                </View>
            </Pressable>

            {isDropdownVisible && (
                <View style={styles.dropdownContent}>
                    <View style={styles.info}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.titleText}>Групи:</Text>
                            <Text style={styles.infoText}>{lesson.group}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.titleText}>Аудиторія:</Text>
                            <Text style={styles.infoText}>{lesson.audience}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.titleText}>Викладач:</Text>
                            <Text style={styles.infoText}>{lesson.teacher}</Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text style={styles.titleText}>Час:</Text>
                            <Text style={styles.infoText}>{lesson.time}</Text>
                        </View>
                    </View>
                    <View style={styles.actions}>
                        <TouchableOpacity style={[styles.button, styles.buttonFirst]} onPress={() => navigation.navigate('Нотатки')}>
                            <Text style={styles.buttonText}>Нотатки</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonSecond]} onPress={showReminderModal}>
                            {!isDismissedReminder ? (
                                <View style={styles.buttonContent}>
                                    <Image source={Bell} style={styles.icon} />
                                    <Text style={styles.buttonText}>Нагадати</Text>
                                </View>
                            ) : (
                                <TouchableOpacity style={[styles.buttonContent]} onPress={buttonState}>
                                    <Image source={CrossedOutCall} style={styles.icon} />
                                    <Text style={styles.buttonText}>Не нагадувати</Text>
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {reminderVisible && !isDismissedReminder && <Reminder onDismissed={updateReminderStatus} onHide={hideReminderModal} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginRight: 24,
        marginLeft: 24,
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: '#332D41',
        border: 0,
    },

    title: {
        padding: 16,
        paddingLeft: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    titleText: {
        fontSize: 14,
        color: 'white',
        paddingBottom: 8,
        paddingTop: 8,
        fontWeight: '500',
        flex: 0.3,
    },

    arrow: {
        width: 9,
        height: 5,
        justifyContent: 'flex-end',
        marginTop: 13,
        marginRight: 13,
    },

    info: {
        flexDirection: 'column',
        gap: 8,
        flex: 1,
    },

    dropdownContent: {
        padding: 24,
        paddingTop: 8,
        backgroundColor: '#1D192B',
        borderTopStartRadius: 0,
        borderTopEndRadius: 0,
        borderRadius: 10,
        flex: 1,
        paddingBottom: 32,
    },

    infoText: {
        fontSize: 14,
        color: 'white',
        paddingBottom: 8,
        paddingTop: 8,
        flex: 0.7,
    },

    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40,
        paddingTop: 8,
        marginTop: 10,
        gap: 16,
    },

    button: {
        flex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 100,
    },

    buttonFirst: {
        backgroundColor: '#1D192B',
        borderColor: '#E8DEF8',
    },

    buttonSecond: {
        backgroundColor: '#6750A4',
        borderWidth: 1,
        borderColor: '#6750A4',
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
    },

    icon: {
        width: 12,
        height: 12,
        marginRight: 5,
        marginTop: 3,
    },

    buttonContent: {
        justifyContent: 'center',
        flexDirection: 'row',
    },

    rowContainer: {
        flexDirection: 'row',
        gap: 14,
    },
});

export default DropDown;
