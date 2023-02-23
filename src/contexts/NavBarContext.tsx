import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
  Dispatch,
} from "react";

interface NavBarContextProps {
  showMenu: boolean;
  setShowMenu: Dispatch<React.SetStateAction<boolean>>;
}

const NavBarContext = createContext({} as NavBarContextProps);
interface Props {
  children: ReactNode;
}

const useNavbarContext = () => {
  return useContext(NavBarContext);
};

const NavBarContextProvider: FC<Props> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const values = {
    showMenu,
    setShowMenu,
  };

  return (
    <NavBarContext.Provider value={values}>{children}</NavBarContext.Provider>
  );
};

export { useNavbarContext, NavBarContextProvider as default };
