import './App.css'
import { useState } from 'react'

// eslint-disable-next-line
export function TwitterFollowCard ({ userName, children, initialIsFollowing }) {

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing 
    ? 'tw-followcard-button is-following'
    : 'tw-followcard-button'

    const handleClick = () => {
        setIsFollowing (!isFollowing)
    }

    return (
        <article className='tw-followcard'>
            <header className='tw-followcard-header'>
                <img className='tw-followcard-avatar' 
                    src= {`https://unavatar.io/${userName}`} alt="Avatar" />
                <div className='tw-followcard-info'>
                    <strong>{ children }</strong>
                    <span className='tw-followcard-infoUserName'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className='tw-followcard-text'>{ text }</span>
                    <span className='tw-followcard-stopFollow'>Dejar de seguir</span>
                </button>
            </aside>
        </article>
    ) 
}