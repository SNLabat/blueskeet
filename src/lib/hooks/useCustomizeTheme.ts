import {useState} from 'react'

export interface CustomizeTheme {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  fontStyle: string;
}

const useCustomizeTheme = (): [CustomizeTheme, (theme: CustomizeTheme) => void] => {
  const [theme, setTheme] = useState<CustomizeTheme>({
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    borderColor: '#000000',
    fontStyle: 'normal',
  });

  const updateTheme = (newTheme: CustomizeTheme) => {
    setTheme(newTheme);
  };

  return [theme, updateTheme];
};

export default useCustomizeTheme;