import React, { useState } from 'react';

import { Text, StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'

import BouncyCheckBox from 'react-native-bouncy-checkbox';

//Form Validation
import * as Yup from 'yup';
import { Formik } from 'formik';

const passwordSchema = Yup.object().shape({
  passwordLenght: Yup.number()
  .min(4,'Should be min of 4')
  .max(15,'Should be max of 15')
  .required('Length Required')
});

export default function App() {
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
      characterList += upperCaseChar;
    }
    if (lowerCase){
      characterList += lowerCaseChar;
    } 
    if (numbers){
      characterList += digitChar;
    }
    if (symbols){
      characterList += specialChar;
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

  return (
      <ScrollView keyboardShouldPersistTaps='handled'>
        <SafeAreaView style={styles.appContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Password Generator</Text>
            <Formik
              initialValues={{ passwordLenght: '',}}
              validationSchema={passwordSchema}
              onSubmit={ values => {
                console.log(values);
                generatePasswordString(Number(values.passwordLenght)) 
              }}
            >
              {({
                values,
                errors,
                touched,
                isValid,
                handleChange,
                handleSubmit,
                handleReset,
                
                /* and other goodies */
              }) => (
                <>
                  <View style={styles.inputWrapper}>
                    <View style={styles.inputColumn}>
                      <Text style={styles.heading}>Password Length</Text>
                      {touched.passwordLenght && errors.passwordLenght && (
                        <Text style = {styles.errorText}>{errors.passwordLenght}</Text>
                      )}
                    </View>
                    <TextInput style={styles.inputStyle}
                      value = {values.passwordLenght}
                      onChangeText={handleChange('passwordLenght')}
                      placeholder='Ex 8'
                      keyboardType='numeric'
                      />
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style = {styles.heading}>Include LowerCase</Text>
                    <BouncyCheckBox isChecked={lowerCase} onPress={() => setLowerCase(!lowerCase)} fillColor='#29AB87'/>
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style = {styles.heading}>Include UpperCase</Text>
                    <BouncyCheckBox isChecked={upperCase} onPress={() => setUpperCase(!upperCase)} fillColor='#2634BC'/>
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style = {styles.heading}>Include Numbers</Text>
                    <BouncyCheckBox isChecked={numbers} onPress={() => setNumbers(!numbers)} fillColor='#FF6347'/>
                  </View>
                  <View style={styles.inputWrapper}>
                    <Text style = {styles.heading}>Include Symbols</Text>
                    <BouncyCheckBox isChecked={symbols} onPress={() => setSymbols(!symbols)} fillColor='#FF8C00'/>
                  </View>
                  {(lowerCase || upperCase || numbers || symbols) ? (
                      <View style={styles.formActions}>
                      <TouchableOpacity 
                        disabled={!isValid}
                        style={styles.primaryBtn}
                        onPress={handleSubmit as unknown as () => void}
                      ><Text style = {styles.primaryBtnTxt}>Generate Password</Text></TouchableOpacity>
                      <TouchableOpacity
                        style={styles.secondaryBtn}
                        onPress={ () => {
                          handleReset();
                          resetPassword();
                        }}
                      ><Text style={styles.secondaryBtnTxt}>Reset</Text></TouchableOpacity>
                    </View>
                  ): (<View><Text style={styles.errorText}>Please check any one checkbox</Text></View>)}
                  
                </>
              )}
            </Formik>
          </View>
          {isPassGenerated ? (
            <View style={[styles.card,styles.cardElevated]}>
              <Text style={styles.subTitle}>GENERATED PASSWORD IS </Text>
              <Text style = {styles.description}>Long press to copy</Text>
              <Text selectable={true} style = {styles.generatedPassword}>{password}</Text>
            </View>
          ): null}
        </SafeAreaView>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor:'#fff'
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
})
