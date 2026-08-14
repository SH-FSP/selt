import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

import {KEYS} from '../../constants/index';

const initialState = {
  user: null,
  isLogged: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLogged = true;
    },
    handleLogout: state => {
      AsyncStorage.removeItem(KEYS.CREDENTIALS);
      AsyncStorage.removeItem(KEYS.ACCESS_TOKEN);
      AsyncStorage.removeItem(KEYS.SOCIAL_TOKEN);
      AsyncStorage.removeItem(KEYS.LOGIN_TYPE);

      state.user = null;
      state.isLogged = false;
    },
  },
});

export const {setUser, handleLogout} = appSlice.actions;
export default appSlice.reducer;
