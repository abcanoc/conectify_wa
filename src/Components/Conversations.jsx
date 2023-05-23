import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import LanguageIcon from "@mui/icons-material/Language";
import Divider from "@mui/material/Divider";
import { styled } from '@mui/system';
// import { createStyled, createTheme } from '@mui/system';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// import { useGetConversations } from "../Services/chatService";
// import { authenticationService } from "../Services/authenticationService";
import commonUtilites from "../Utilities/common";

// const useStyles = createStyled((theme) => ({
//     subheader: {
//       display: "flex",
//       alignItems: "center",
//       cursor: "pointer",
//     },
//     globe: {
//       backgroundColor: theme.palette.primary.dark,
//     },
//     subheaderText: {
//       color: theme.palette.primary.dark,
//     },
//     list: {
//       maxHeight: "calc(100vh - 112px)",
//       overflowY: "auto",
//     },
//   }));

// const useStyles = makeStyles((theme) => ({
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
// }));

  

const Conversations = (props) => {
//   const classes = useStyles();
  const [conversations, setConversations] = useState([]);
//   const [newConversation, setNewConversation] = useState(null);
//   const getConversations = useGetConversations();

  // Returns the recipient name that does not
  // belong to the current user.
  const handleRecipient = (recipients) => {
    for (let i = 0; i < recipients.length; i++) {
      if (
        true
        // recipients[i].username !==
        // authenticationService.currentUserValue.username
      ) {
        return recipients[i];
      }
    }
    return null;
  };

//   useEffect(() => {
//     getConversations().then((res) => setConversations(res));
//   }, [newConversation]);

//   useEffect(() => {
//     let socket = socketIOClient(process.env.REACT_APP_API_URL);
//     socket.on("messages", (data) => setNewConversation(data));

//     return () => {
//       socket.removeListener("messages");
//     };
//   }, []);

  return (
    <List>
      <ListItem
        // classes={{ root: classes.subheader }}
        onClick={() => {
          props.setScope("Global Chat");
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <LanguageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Global Chat" />
      </ListItem>
      <Divider />

      {conversations && (
        <React.Fragment>
          {conversations.map((c) => (
            <ListItem
            //   className={classes.listItem}
              key={c._id}
              button
              onClick={() => {
                props.setUser(handleRecipient(c.recipientObj));
                props.setScope(handleRecipient(c.recipientObj).name);
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  {commonUtilites.getInitialsFromName(
                    handleRecipient(c.recipientObj).name
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={handleRecipient(c.recipientObj).name}
                secondary={<React.Fragment>{c.lastMessage}</React.Fragment>}
              />
            </ListItem>
          ))}
        </React.Fragment>
      )}
    </List>
  );
};

export default Conversations;