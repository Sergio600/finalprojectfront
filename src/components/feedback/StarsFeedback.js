import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Style from './StyleFeedback.module.css'

const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

const useStyles = makeStyles({
    root: {
        width: 50,
        display: 'flex',
        alignItems: 'center'
    }
});

export default function HoverRating() {
    const [value, setValue] = React.useState(5);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Rating
                name="hover-feedback"
                value={value}
                precision={1}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
            />
            {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}

        </div>
    );
}
