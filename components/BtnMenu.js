import React from 'react'
import {
    IconButton,
    Text,
    Button,
    Provider,
    Portal,
    Modal,
    Menu,
    Divider,
} from 'react-native-paper'
import { Image, View } from 'react-native'

const BtnMenu = ({ homeItem }) => {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
                <IconButton
                    icon='dots-vertical'
                    size={20}
                    animated={true}
                    onPress={openMenu}
                />
            }
        >
            <Menu.Item onPress={() => { }} title="Item 1" />
            <Menu.Item onPress={() => { }} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => { }} title="Item 3" />
        </Menu>
    )
}

export default BtnMenu
