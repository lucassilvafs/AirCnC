import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, SafeAreaView, Platform } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
      AsyncStorage.getItem('techs').then(storagedTechs => {
          const techsArray = storagedTechs.split(',').map(techs => techs.trim());

          setTechs(techsArray);
      })
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            
            <ScrollView>
            {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: Platform.OS === "android" ? 50 : 10
    }
});