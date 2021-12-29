import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthNavigator from './navigation/authNavigator'
import Home from './screens/app/home';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from './redux/actions/user';
import MainNavigator from './navigation/mainNavigator';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Main = () => {

    {
        // // Set an initializing state whilst Firebase connects
        // const [initializing, setInitializing] = useState(true);
        // const [user, setUser] = useState();

        // // Handle user state changes
        // function onAuthStateChanged(user) {

        //     console.log(user)

        //     setUser(user);
        //     if (initializing) setInitializing(false);
        // }

        // useEffect(() => {
        //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        //     return subscriber; // unsubscribe on unmount
        // }, [user]);

        // if (initializing) return null;

        // if (!user) {
        //     return (
        //         <NavigationContainer>
        //             <AuthNavigator />
        //         </NavigationContainer>
        //     )
        // }

        // return (
        //     <Home />
        // );
    }

    console.log(auth().currentUser)

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userReducer.user)


    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .doc(auth()?.currentUser?.phoneNumber?.toString())
            .onSnapshot(documentSnapshot => {
                // console.log('User data: ', documentSnapshot.data());
                dispatch(addUser(documentSnapshot.data()))

            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, []);

    useEffect(() => {
        // console.log('user Information', userInfo)
    }, [userInfo])


    return <MainNavigator />



}

export default Main

const styles = StyleSheet.create({})
