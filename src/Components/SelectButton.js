import React,{useState,useCallback, Component} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import ShortWrite from '../Pages/See/ShortWrite';
import Write from '../Pages/See/Write';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button:{
    width:90,
    height:50,
  },
}
));


function BasicButtonGroup(props){                                                   
    const classes = useStyles();
    const [numValue,setNumValue] = useState(props.num);
    
    function SetFrame(props){
      if(props==-1){
        var link = "http://localhost:3000/shortWrite";
        window.location.assign(link);
      }
      else{
        var link = "http://localhost:3000/write";
        window.location.assign(link);
      }
    }

    return (
      <div className={classes.root}>                                                               
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button className={classes.button} color={numValue === -1 ? "primary":"secondary"} onClick={()=>SetFrame(-1)}>Short</Button>
          <Button className={classes.button} color={numValue === 1 ? "primary":"secondary"} onClick={()=>SetFrame(1)}>Express</Button>
        </ButtonGroup>
      </div>
    );

}

export default BasicButtonGroup;