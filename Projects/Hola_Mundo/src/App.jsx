import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
    {
        userName: 'midudev',
        name: 'Miguel Angel Duran',
        isFollowing: true
    },

    {
        userName: 'kikobeats',
        name: 'KikoBeats',
        isFollowing: false
    },

    {
        userName: 'Valorant',
        name: 'Valorant',
        isFollowing: true
    }
]

export function App() {
    return(
        <section className='App'>
            {
                users.map(({ userName, name, isFollowing }) => (
                    <TwitterFollowCard
                        key={userName}
                        userName={userName}
                        initialIsFollowing={isFollowing}
                    >
                        {name}
                    </TwitterFollowCard>
                ))
            }
        </section>
    )
}