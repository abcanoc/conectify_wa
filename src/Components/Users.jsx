import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {useDispatch, useSelector} from 'react-redux'
// import { createStyled, createTheme } from '@mui/system';
import commonUtilites from "../Utilities/common";
import { getChannels } from '../Redux/ChannelsDuck';

// const useStyles = createStyled((theme) => ({
//   subheader: {
//     display: "flex",
//     alignItems: "center",
//     cursor: "pointer",
//   },
//   globe: {
//     backgroundColor: theme.palette.primary.dark,
//   },
//   subheaderText: {
//     color: theme.palette.primary.dark,
//   },
//   list: {
//     maxHeight: "calc(100vh - 112px)",
//     overflowY: "auto",
//   },
//   avatar: {
//     margin: theme.spacing(0, 3, 0, 1),
//   },
// }));

const Users = (props) => {
    //   const classes = useStyles();
    const dispatch = useDispatch()

    // const usersFound = useSelector(store => store.channels.channels)
    const users = useSelector(store => store.channels.channels)
    // const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState(null);
    //   const getUsers = useGetUsers();

    //   useEffect(() => {
    //     getUsers().then((res) => setUsers(res));
    //   }, [newUser]);

    useEffect(() => {
        dispatch(getChannels())
        // console.log("users")
        // console.log(users)
    }, []);


    return (
        <List>
            {users && (
                <React.Fragment>
                    {users.map((u) => (
                        <ListItem
                            //   className={classes.listItem}
                            key={u.id}
                            onClick={() => {
                                // console.log("user")
                                // console.log(u)
                                props.setUser(u);
                                props.setScope(u.name);
                            }}
                            button
                        >
                            <ListItemAvatar >
                                <Avatar>{commonUtilites.getInitialsFromName(u.name)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={u.name} />
                        </ListItem>
                    ))}
                </React.Fragment>
            )}
        </List>
    );
};

export default Users;