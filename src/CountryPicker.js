import React, { useState } from 'react'
import { View, Text, StyleSheet, PixelRatio, Switch, TouchableOpacity } from "react-native";
import CountryPicker from 'react-native-country-picker-modal'
import { CountryCode, Country } from './src/types'

export default function Example() {
  const [countryCode, setCountryCode] = useState('')
  const [country, setCountry] = useState(null)
  const [withCountryNameButton, setWithCountryNameButton] = useState(true,)
  const [withCountryNameText, setWithCountryNameText] = useState(true,)
  const [withFlag, setWithFlag] = useState(true)
  const [withEmoji, setWithEmoji] = useState(true)
  const [withFilter, setWithFilter] = useState(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState(true)
  const [withCallingCode, setWithCallingCode] = useState(true)
  const [show,setShow]=useState(false)
  const [count,setcount]=useState('')
  const onSelect = (country: Country) => {setCountryCode(country.cca2),setCountry(country)}

  return (
    <View >
      <TouchableOpacity onPress={()=>{setShow(!show)}}>
        <Text style={{fontWeight:"bold",fontSize:18}}>Select Country</Text>
      </TouchableOpacity>
      <Text style={{color:"red"}}>Welcome to Country Picker !</Text>
          <CountryPicker
        {...{
          countryCode,
          withFilter,
          // withFlag,
          withCountryNameButton,
          withCountryNameText,
          withAlphaFilter,
          withCallingCode,
          withEmoji,
          onSelect,
        }}

      />
      <Text style={{color:"blue"}}>Press on the flag to open modal</Text>
      {country !== null && (
        <Text style={{color:"red"}}>{country.name}</Text>
      )}
    </View>
  )
}
