import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import {useDispatch, useSelector} from 'react-redux'
import classnames from "classnames";
import commonUtilites from "../Utilities/common";
import { createMessage, getMessages } from "../Redux/MessagesDuck";
// import { createStyled, createTheme } from '@mui/system';

// import {
//   useGetGlobalMessages,
//   useSendGlobalMessage,
//   useGetConversationMessages,
//   useSendConversationMessage,
// } from "../Services/chatService";
// import { authenticationService } from "../Services/authenticationService";

// const useStyles = createStyled((theme) => ({
//   root: {
//     height: "100%",
//   },
//   headerRow: {
//     maxHeight: 60,
//     zIndex: 5,
//   },
//   paper: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100%",
//     color: theme.palette.primary.dark,
//   },
//   messageContainer: {
//     height: "100%",
//     display: "flex",
//     alignContent: "flex-end",
//   },
//   messagesRow: {
//     maxHeight: "calc(100vh - 184px)",
//     overflowY: "auto",
//   },
//   newMessageRow: {
//     width: "100%",
//     padding: theme.spacing(0, 2, 1),
//   },
//   messageBubble: {
//     padding: 10,
//     border: "1px solid white",
//     backgroundColor: "white",
//     borderRadius: "0 10px 10px 10px",
//     boxShadow: "-3px 4px 4px 0px rgba(0,0,0,0.08)",
//     marginTop: 8,
//     maxWidth: "40em",
//   },
//   messageBubbleRight: {
//     borderRadius: "10px 0 10px 10px",
//   },
//   inputRow: {
//     display: "flex",
//     alignItems: "flex-end",
//   },
//   form: {
//     width: "100%",
//   },
//   avatar: {
//     margin: theme.spacing(1, 1.5),
//   },
//   listItem: {
//     display: "flex",
//     width: "100%",
//   },
//   listItemRight: {
//     flexDirection: "row-reverse",
//   },
// }));

const ChatBox = (props) => {
//   const [currentUserId] = useState(
//     authenticationService.currentUserValue.userId
//   );
  const dispatch = useDispatch()
  const [currentUserId] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);
  const msgs = useSelector(store => store.messages.messages)
  const messages = useSelector(store => store.messages.messages)

  useEffect(() => {
    // console.log("id")
    // console.log(props.user.id)
    dispatch(getMessages(props.user.id,"20"))
    console.log("msg")
    console.log(messages)
    // console.log("logged u")
    // console.log(props.LoggedUser)
}, [props.user]);


//   const getGlobalMessages = useGetGlobalMessages();
//   const sendGlobalMessage = useSendGlobalMessage();
//   const getConversationMessages = useGetConversationMessages();
//   const sendConversationMessage = useSendConversationMessage();

  let chatBottom = useRef(null);
//   const classes = useStyles();

//   useEffect(() => {
//     reloadMessages();
//     scrollToBottom();
//   }, [lastMessage, props.scope, props.conversationId]);

//   useEffect(() => {
//     const socket = socketIOClient(process.env.REACT_APP_API_URL);
//     socket.on("messages", (data) => setLastMessage(data));
//   }, []);

//   const reloadMessages = () => {
//     if (props.scope === "Global Chat") {
//       getGlobalMessages().then((res) => {
//         setMessages(res);
//       });
//     } else if (props.scope !== null && props.conversationId !== null) {
//       getConversationMessages(props.user._id).then((res) => setMessages(res));
//     } else {
//       setMessages([]);
//     }
//   };

//   const scrollToBottom = () => {
//     chatBottom.current.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMessage(props.user.id, props.LoggedUser.toString() ,newMessage))
    // if (props.scope === "Global Chat") {
    //   sendGlobalMessage(newMessage).then(() => {
    //     setNewMessage("");
    //   });
    // } else {
    //   sendConversationMessage(props.user._id, newMessage).then((res) => {
    //     setNewMessage("");
    //   });
    // }
    setNewMessage("")
    dispatch(getMessages(props.user.id,"20"))
  };

  return (
    <Grid container >
      <Grid item xs={12} >
        <Paper square elevation={2}>
          <Typography color="inherit" variant="h6">
            {props.user.name}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container >
          <Grid item xs={12} >
            {messages && (
              <List>
                {messages.map((m) => (
                  <ListItem
                    key={m.id}
                    // className={classnames(classes.listItem, {
                    //   [`${classes.listItemRight}`]:
                    //     m.fromObj[0]._id === currentUserId,
                    // })}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Avatar>
                        U
                        {/* {commonUtilites.getInitialsFromName(m.fromObj[0].name)} */}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    //   classes={{
                    //     root: classnames(classes.messageBubble, {
                    //       [`${classes.messageBubbleRight}`]:
                    //         m.fromObj[0]._id === currentUserId,
                    //     }),
                    //   }}
                    //   primary={m.fromObj[0] && m.fromObj[0].name}
                      secondary={<React.Fragment>{m.content}</React.Fragment>}
                    Text/>
                  </ListItem>
                ))}
              </List>
            )}
            <div ref={chatBottom} />
          </Grid>
          <Grid item xs={12} >
            <form onSubmit={handleSubmit}>
              <Grid
                container
                // className={classes.newMessageRow}
                alignItems="flex-end"
              >
                <Grid item xs={11}>
                  <TextField
                    id="message"
                    label="Message"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton type="submit">
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatBox;