import {createContext, useContext, useMemo} from 'react';

export type AuthState = {
  isLogged: boolean;
};
export type AuthAction = {type: 'SIGN_IN' | 'SIGN_OUT'};

const AuthContext = createContext({
  state: {
    isLogged: false,
  },
  dispatch: (value: AuthAction) => {
    value;
  },
});
export const AuthProvider = AuthContext.Provider;
export const useAuth = () => {
  const {state, dispatch} = useContext(AuthContext);
  const actions = useMemo(
    () => ({
      signIn: () => dispatch({type: 'SIGN_IN'}),
      signOut: () => dispatch({type: 'SIGN_OUT'}),
    }),
    [],
  );

  return {
    user: state,
    ...actions,
  };
};
export const initialAuth = {
  isLogged: false,
};
export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isLogged: true,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isLogged: false,
      };
    default:
      return {
        ...state,
      };
  }
};
