import React, { useState } from 'react';
import { firestore } from '../firebase';
import useUserContext from '../context/userContext';
import history from '../plugins/history';
import styled from 'styled-components';

const Post: React.FC = () => {
  const { user } = useUserContext();
  const [text, setText] = useState<string>('');

  if (!user) {
    history.push(`/`);
    return null;
  }

  const sendInputValue = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await firestore
          .collection('post')
          .doc()
          .set({
            text: text,
            id: user.uid,
          });
        history.push(`/`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Input
        type="text"
        value={text}
        placeholder="コツの掴み方"
        onKeyPress={(e) => sendInputValue(e as React.KeyboardEvent<HTMLInputElement>)}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
};

const Input = styled.input`
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #757575;
  outline: none;
  margin: 10rem auto;
`;

export default Post;
