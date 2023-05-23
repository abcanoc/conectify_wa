import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux'
// import { createStyled, createTheme } from '@mui/system';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
// import Header from '../Layout/Header';
import ChatBox from './ChatBox';
import Conversations from './Conversations';
import Users from './Users';
import { getChannels } from '../Redux/ChannelsDuck';

// const useStyles = createStyled(theme => ({
//     paper: {
//         minHeight: 'calc(100vh - 64px)',
//         borderRadius: 0,
//     },
//     sidebar: {
//         zIndex: 8,
//     },
//     subheader: {
//         display: 'flex',
//         alignItems: 'center',
//         cursor: 'pointer',
//     },
//     globe: {
//         backgroundColor: theme.palette.primary.dark,
//     },
//     subheaderText: {
//         color: theme.palette.primary.dark,
//     },
// }));


const Chat = () => {
    const [scope, setScope] = useState('Global Chat');
    const [tab, setTab] = useState(0);
    const [user, setUser] = useState('abrilcanoc');
    const channelsFound = useSelector(store => store.channels)
    const dispatch = useDispatch()
    // const classes = useStyles();

    const handleChange = (e, newVal) => {
        setTab(newVal);
    };

    useEffect(() => {
        // console.log(user)
        // dispatch(getChannels())
    }, [user]);

    useEffect(() => {
        dispatch(getChannels())
    }, []);

    return (
        <React.Fragment>
            {/* <Header /> */}
            <Grid container>
                <Grid item md={4} >
                    <Paper square elevation={5}>
                        <Paper square>
                            <Tabs
                                onChange={handleChange}
                                variant="fullWidth"
                                value={tab}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                {/* <Tab label="Chats" /> */}
                                <Tab label="Channels" />
                            </Tabs>
                        </Paper>
                        <Users setUser={setUser} setScope={setScope} />
                        {/* {tab === 0 && (
                            <React.Fragment>
                                <Typography
                                    component="h1"
                                    variant="h6"
                                    color="inherit"
                                    noWrap
                                    sx={{ flexGrow: 1 }}
                                >
                                    tab0
                                </Typography>
                                <Conversations
                                    setUser={setUser}
                                    setScope={setScope}
                                />
                            </React.Fragment>
                        )}
                        {tab === 1 && (
                            <Users setUser={setUser} setScope={setScope} />
                        )} */}
                    </Paper>
                </Grid>
                <Grid item md={8}>
                    <ChatBox scope={scope} user={user} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Chat;