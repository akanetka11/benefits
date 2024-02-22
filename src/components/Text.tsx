import React, { memo } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { colors } from '../styles';

export enum TextWeight {
  Normal = 'Regular',
  Medium = 'Medium',
  Bold = 'Bold',
}

export enum TextAlign {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

export enum TextFamily {
  SFUIDisplay = 'SF-UI-Display',
}

export type TextProps = Readonly<
  Partial<{
    fontSize: number;
    fontFamily: TextFamily;
    weight: TextWeight;
    textAlign: TextAlign;
    color: string;
    children: React.ReactNode;
    style: StyleProp<TextStyle>;
    lineHeight: number;
    onPress: () => void;
  }>
>;

const _Text: React.FC<TextProps> = memo(
  ({
    fontSize = 16,
    fontFamily = TextFamily.SFUIDisplay,
    weight = TextWeight.Normal,
    textAlign = TextAlign.Left,
    color = colors.black,
    children = '',
    style = {},
    lineHeight = fontSize * 1.4,
    onPress,
  }) => {
    const styles = getStyles({
      fontFamily,
      fontSize,
      weight,
      color,
      lineHeight,
      textAlign,
    });

    return (
      <Text style={[styles.text, style]} onPress={onPress}>
        {children}
      </Text>
    );
  }
);

const getStyles = ({
  fontFamily,
  fontSize,
  weight,
  color,
  textAlign,
  lineHeight,
}: TextProps) =>
  StyleSheet.create({
    text: {
      color,
      fontFamily: `${fontFamily}-${weight}`,
      textAlign,
      fontSize,
      lineHeight,
    },
  });

export default React.memo(_Text);
