import React, { useState } from 'react'

import ProfileModal from 'components/Modals/ProfileModal/ProfileModal'
import { useHistory } from 'react-router-dom'
import Layout from 'hoc/Layout'
import SearchContent from './SearchContent/SearchContent'
import { Home, Movies, Tv, LatestVideo, List } from './routes'


const Browse = props => {

    const { route } = props
    const initialState = localStorage.getItem('profileSelected') ? false : true
    const [modal, setModal] = useState(initialState)
    const history = useHistory()

    const profileClickHandler = () => {
        setModal(false)
        localStorage.setItem('profileSelected', true)
    }

    let browseContent
    if (route === '/browse') {
        browseContent = <Home />
    } else if (route === '/browse/movies') {
        browseContent = <Movies />
    } else if (route === '/browse/tv') {
        browseContent = <Tv />
    } else if (route === '/browse/latest') {
        browseContent = <LatestVideo />
    } else if(route === '/browse/list') {
        browseContent = <List />
    }
    else if (route === '/search') {
        browseContent = <SearchContent searchParam={history.location.search.substring(3)} />
    }

    return (
        <>
            <ProfileModal modalOpen={modal} profileClickHandler={profileClickHandler} />
            {!modal && <Layout>
                {browseContent}
            </Layout>}
        </>
    )
}



export default Browse