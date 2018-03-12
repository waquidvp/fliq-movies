import React from 'react';
import styled from 'styled-components/native';

const MainContainer = styled.View`
  height: 40px;
  width: 100%;
  margin-vertical: 8px;
`;

const TextInput = styled.TextInput`
  width: 100%;
  height: 100%;
  color: black;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding-vertical: 0px;
`;

const Indicator = styled.View`
  margin-left: 4px;
  width: 45px;
  height: 3px;
  border-radius: 1.5px;
  background-color: black;
`;

const Input = ({
  placeholder,
  placeholderTextColor,
  onChangeText,
  value,
  secureTextEntry,
  autoCapitalize,
  keyboardType,
}) => (
  <MainContainer>
    <TextInput
      underlineColorAndroid="transparent"
      placeholder={placeholder}
      placeholderTextColor="#0000007F"
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureTextEntry}
      numberOfLines={1}
      selectionColor="black"
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
    />
    <Indicator />
  </MainContainer>
);

export default Input;
