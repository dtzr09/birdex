import React from 'react'
import Hero from '../components/Hero/Hero'
import Nav from '../components/Navbar/Nav'
import { PageWrapper } from './HomePageStyle'

function HomePage() {
    return (
        <PageWrapper>
            <Nav/>
            <Hero/>
        </PageWrapper>
    )
}

export default HomePage
