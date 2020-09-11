import React from 'react';
import {Button} from 'react-bootstrap';

export default function AppButton(props) {
    
    return(
      <Button block onClick={props.onClick} value={props.value} variant={props.type}>
        {props.value}
      </Button>
    );

}