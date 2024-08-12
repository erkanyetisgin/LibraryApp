import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { getUserImageSrc } from '@/services/imageService';

interface AvatarProps {
  uri: string;
  size?: number;
  rounded?: number;
  style?: any;
}

const Avatar: React.FC<AvatarProps> = ({ uri, size = 50, rounded = 25, style }) => {
  return (
    <View style={[styles.avatarContainer, { width: size, height: size, borderRadius: rounded }, style]}>
      <Image 
        source={getUserImageSrc(uri)} 
        style={[styles.avatar, { width: size, height: size, borderRadius: rounded }]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    overflow: 'hidden',
  },
  avatar: {
    resizeMode: 'cover',
  },
});

export default Avatar;
