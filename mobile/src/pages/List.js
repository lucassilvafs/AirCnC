import React, { useEffect, useState } from 'react';
import socketio from 'socket.io-client';
import { StyleSheet, Image, SafeAreaView, Platform, Alert } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.10:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            });
      }, []);

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