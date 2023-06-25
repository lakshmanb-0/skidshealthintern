'use client'
import { store } from '@/store/store'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'

export function Providers({ children }) {
    return (
        <Provider store={store}>
            <CacheProvider>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </Provider>
    )
}