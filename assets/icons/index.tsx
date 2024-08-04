import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icons from './Icons'
import { theme } from '../../constants/theme'

const icons = {
    home: Icons.Home,
    backButton: Icons.BackButton,
    mail: Icons.Mail,
    password: Icons.Password,
    user: Icons.User,
}

interface IconProps {
    name: keyof typeof icons;
    size?: number;
    strokeWidth?: number;
    colors:  string ;
}

const Icon = ({ name, ...props }: IconProps) => {
    const IconComponent = icons[name];
    return (
        <IconComponent 
            height={props.size || 24}
            width={props.size || 24}
            strokeWidth={props.strokeWidth || 1.9}
            color={props.colors || theme.colors.text}
            {...props}
        />
    )
}

export default Icon

const styles = StyleSheet.create({})
