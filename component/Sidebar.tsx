import { FC } from "react";
import { Avatar, Button, IconButton, Input } from "@mui/material";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getFirestore,
  collection,
  addDoc,
  QuerySnapshot,
  where,
  query,
  DocumentData,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "@/firebase";
import Chat from "./Chat";

interface SidebarProps {
  // Define any props specific to your Sidebar component
}

const Sidebar: FC<SidebarProps> = () => {
  const [user] = useAuthState(auth);
  const userChatRef = query(
    collection(getFirestore(), "chats"),
    where("users", "array-contains", user?.email)
  );
  const [chatSnapshot = {} as QuerySnapshot<DocumentData>] =
    useCollection(userChatRef);

  const createChat = () => {
    const input = prompt("Please enter an email address you wish to chat with");

    if (!input) return;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      user &&
      input !== user.email
    ) {
      const firestore = getFirestore();
      const chatsCollection = collection(firestore, "chats");

      addDoc(chatsCollection, {
        users: [user.email, input],
      })
        .then(() => {
          console.log("Chat added successfully!");
        })
        .catch((error) => {
          console.error("Error adding chat to Firestore:", error.message);
        });
    }
  };

  const chatAlreadyExists = (recipientEmail: string): boolean => {
    return !!chatSnapshot?.docs?.find((chat) => {
      const users = chat.data().users as string[];
      return users.includes(recipientEmail);
    });
  };

  return (
    <div>
      <Container>
        <Header>
          <UserAvatar
            onClick={() => {
              auth.signOut();
            }}
            src={user?.photoURL ?? undefined}
          />
          <IconContainer>
            <IconButton>
              <ChatIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </IconContainer>
        </Header>

        <Search>
          <SearchIcon />
          <SearchInput placeholder="Search in chats" />
        </Search>
        <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
        {/* ... */}
        {chatSnapshot?.docs?.map((chat) => {
          const id = chat.id as string;
          const users: string[] = (chat.data().users || []) as string[];
          return <Chat key={id} id={id} users={users} />;
        })}
      </Container>
    </div>
  );
};

export default Sidebar;

// Styled components and other parts of your code remain unchanged

const Container = styled.div``;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const IconContainer = styled.div``;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
  border: none;
`;
const SearchInput = styled(Input)`
  && {
    outline: none;
    border: none;
    flex: 1;
    &:before,
    &:after {
      content: none;
    }
  }
`;
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
  color: black;
`;
