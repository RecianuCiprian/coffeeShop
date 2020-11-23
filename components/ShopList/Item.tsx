import React from 'react';
import {Button, Card, Icon} from "react-native-elements";
import {StyleSheet, Dimensions} from "react-native";

const width = Dimensions.get('window').width; //full width


const Item: React.FC<any> = ({image_url, name}) => {
    return (
        <Card>
            <Card.Title>{name}</Card.Title>
            <Card.Divider/>
            <Card.Image source={{uri: image_url}}/>
            <Button
                icon={<Icon name="code" color="#ffffff"/>}
                buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                }}
                title="VIEW NOW"
            />
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: width
    },
});

export default React.memo(Item);
