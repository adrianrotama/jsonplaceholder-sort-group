import React, { Component } from 'react'
import AudioPlayer from './AudioPlayer'

class MultipleAudio extends Component {

    render() {
        return (
            <div className="audio-page">
                <div className="adaptive-content content">
                    <AudioPlayer title="New Wave Kit" url="https://static.bandlab.com/soundbanks/previews/new-wave-kit.ogg"/>
                    <AudioPlayer title="Synth Organ" url="https://static.bandlab.com/soundbanks/previews/synth-organ.ogg"/>
                </div>
            </div>
        )
    }
}

export default MultipleAudio


