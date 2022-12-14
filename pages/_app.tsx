import '../styles/globals.css'
import type { AppProps } from 'next/app'

//INTERNAL IMPORT

import { ToDoListProvider } from '../context/ToDoListApp'

const App = ({ Component, pageProps }: AppProps) => (
  <ToDoListProvider>
    <div>
      <Component {...pageProps} />
    </div>
  </ToDoListProvider>
) 

export default App;