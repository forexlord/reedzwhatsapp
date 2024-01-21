"use client";
import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
import { auth } from "@/firebase";

function Sidebar() {
  const createChat = () => {
    const input = prompt("please a email address you wish to chat with");

    if (!input) return null;

    if (EmailValidator.validate(input)) {
    }
  };
  return (
    <div>
      <Container>
        <Header>
          <UserAvatar
            onClick={() => {
              auth.signOut();
            }}
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
          <SearchInput placeholder="search in chats" />
        </Search>
      </Container>
      <SidebarButton onClick={createChat}>start a new chat</SidebarButton>
    </div>
  );
}

export default Sidebar;

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
`;
const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
  color: black;
`;
