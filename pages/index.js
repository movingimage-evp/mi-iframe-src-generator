import { useEffect, useState } from 'react';

const Index = () => {
    const [origin, setOrigin] = useState('');
    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Greetings!</h1>
            <p>To use this generator, please call the endpoint in the same fashion you would call the original playout endpoint:</p>
            <p>{origin}/video?video-id=<strong>VIDEOID</strong>&player-id=<strong>PLAYERID</strong>&channel-id=<strong>CHANNELID</strong></p>
        </div>
    );
}

export default Index;