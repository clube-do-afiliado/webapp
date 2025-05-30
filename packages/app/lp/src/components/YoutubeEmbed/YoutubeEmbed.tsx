import { useState } from 'react';
import './YoutubeEmbed.scss';

interface YoutubeEmbedProps {
    videoId: string;
    title: string;
}

export default function YoutubeEmbed({ videoId, title }: YoutubeEmbedProps) {
    const [isPlayerActive, setIsPlayerActive] = useState(false);

    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <div className="video-responsive">
            {isPlayerActive ? (
                <iframe
                    allowFullScreen
                    width="100%"
                    height="550"
                    title={title}
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
            ) : (
                <div className="video-facade" onClick={() => setIsPlayerActive(true)}>
                    <img src={thumbnail} alt={`Thumbnail do vídeo: ${title}`} loading="lazy" />
                    <button className="play-button" aria-label="Assistir vídeo">
                        ▶
                    </button>
                </div>
            )}
        </div>
    );
}