import 'antd/dist/antd.css'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
import { useStore } from '../redux/store'

function MyApp({ Component, pageProps }: AppProps) {
    const store = useStore(pageProps.initialReduxState)

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
