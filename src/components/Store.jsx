import { View, InteractionManager } from 'react-native'
import React, { useCallback, useState } from 'react'
import { Avatar, Button, Card } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import BASE_URL from '../utils/api'
import { GlobalContext } from '../globalcontext'
import Loader from './Loader'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Store = () => {

    const { state: globalState, dispatch: globalDispatch } = GlobalContext();
    const [didAnimationFinish, setdidAnimationFinish] = useState(false)

    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(async () => {
                const { data: { resturants } } = await axios.get(`${BASE_URL}/api/resturant/getAllResturant`)
                globalDispatch({ type: "GET_ALL_STORES", payload: resturants })
                setdidAnimationFinish(true)
            })
            return () => task.cancel()
        }, [])
    )

    if (!didAnimationFinish) {
        return <Loader />
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <Card style={{
                width: "90%", marginHorizontal: "auto", marginTop: 10,
                shadowColor: "#bdbdbd", shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7, shadowRadius: 10
            }}>
                <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Actions>
                    <Button>Cancel</Button>
                    <Button>Ok</Button>
                </Card.Actions>
            </Card>
        </View>
    )
}

export default Store