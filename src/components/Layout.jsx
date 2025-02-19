import React from 'react'
import Header from './Header'
import Footer from './Footer'

function Layout({ children }) {
    return (
        <>


            <Header />

            <main style={{ height: 'auto' }}>
                {children}
            </main>

            <Footer />
        </>
    )
}

export default Layout
