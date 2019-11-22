import React, { useState } from 'react';
import { firestore } from '../firebase';
import useUserContext from '../context/userContext';
import history from '../plugins/history';

const Post: React.FC = () => {
  const { user } = useUserContext();
  const [text, setText] = useState<string>('');

  console.log(user);

  if (!user) {
    history.push(`/`);
    return null;
  }

  const sendInputValue = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        const responsePost = await firestore
          .collection('user')
          .doc()
          .set({
            name: text,
          });
        console.log(responsePost);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        placeholder="Search…"
        onKeyPress={(e) => sendInputValue(e as React.KeyboardEvent<HTMLInputElement>)}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
};

export default Post;
