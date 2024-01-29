import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import { db } from "@/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { log } from "console";
import { useRouter } from "next/navigation";

interface ChatProps {
  id: string;
  users: string[];
  // Add other props if needed
}

function Chat({ id, users }: ChatProps) {
  const [recipientData, setRecipientData] = useState<any | undefined>();
  const router = useRouter();
  console.log(id);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  useEffect(() => {
    const fetchRecipientData = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("email", "==", users[1])
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming you only expect one document
          const doc = querySnapshot.docs[0];
          setRecipientData(doc.data());
        } else {
          // console.log("User not found");
        }
      } catch (error) {
        // console.error("Error fetching recipient data:", error);
      }
    };

    fetchRecipientData();
  }, [users]);

  return (
    <Container onClick={enterChat}>
      {recipientData ? (
        <AvatarIcon src={recipientData?.photoUrl} />
      ) : (
        <AvatarIcon>{users[1]?.[0]}</AvatarIcon>
      )}
      <p
        style={{
          margin: 0,
        }}
      >
        {users[1]}
      </p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  word-break: break-word;
  cursor: pointer;
  &:hover {
    background: #e9eaeb;
  }
`;

const AvatarIcon = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
