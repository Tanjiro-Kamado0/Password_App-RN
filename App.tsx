import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'

//Form Validation
import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  passwordLenght: Yup.number()
  .min(4,'Should be min of 4')
  .max(15,'Should be max of 15')
  .required('Length Required')
});

const [password,setPassword] = useState('')
const [isPassGenerated,setIsPassGenerated] = useState(false)

const [lowerCase,setLowerCase] = useState(true)
const [upperCase,setUpperCase] = useState(false)
const [numbers,setNumbers] = useState(false)
const [symbols,setSymbols] = useState(false)

const generatePasswordString = (passwordLenght:number) => {
  let characterList = '';

  const upperCaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChar = 'abcdefghijklmnopqrstuvwxyz';
  const digitChar = '0123456789';
  const specialChar = '!@#$%^&*()_+[]{}|;:,.<>?';

  if (upperCase){
    characterList += upperCase;
  }
  if (lowerCase){
    characterList += lowerCase;
  } 
  if (numbers){
    characterList += numbers;
  }
  if (symbols){
    characterList += symbols;
  }

  const createdPassword = createPassword(characterList, passwordLenght);

  setPassword(createdPassword);
  setIsPassGenerated(true);

}

const createPassword = (characters:string,passwordLenght:number) => {
  let result = '';
  for (let i = 0; i < passwordLenght; i++) {
    const characterIndex = Math.round(Math.random() * characters.length);
    result += characters.charAt(characterIndex);
  }
  return result;
}

const resetPassword = () => {
  setPassword('');
  setIsPassGenerated(false);
  setLowerCase(true); 
  setUpperCase(false);
  setNumbers(false);
  setSymbols(false);
}

export default function App() {
    return (
      <View>
        <Text> APP </Text>
      </View>
    )
}

const styles = StyleSheet.create({})
