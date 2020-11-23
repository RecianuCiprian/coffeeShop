import React from 'react';
import {Button, Card, Icon} from "react-native-elements";

const Item: React.FC<any> = ({image_url, name}) => (
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

export default React.memo(Item);
