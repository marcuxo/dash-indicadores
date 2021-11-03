import React from 'react'
import { AuthContext } from '../App';

export default function LoginGuestComponent() {
  const {dispatch} = React.useContext(AuthContext);
  dispatch({
    type: "LOGIN",
    payload: {
      user: "guest",
      token: 'gueste8f76se8f7we68f7we65df4we68f7we6r87t6wbe4r7t6b48w7er6t87er68t7b6w8e7t6e8wr7tbw68er7t6wer'
    }
  })
}
