import React, { Component } from 'react'
import PlayPauseButton from './PlayPauseButton'
import Sound from 'react-sound'

class AudioPlayer extends Component {
    constructor() {
        super()
        this.state = {
            playStatus: Sound.status.STOPPED,
            elapsed: "00:00", //current audio position
            total: '00:00', //song duration
            position: 0, // for progress bar
            playFromPosition: 0
        }
    }
    
    handleSongPlaying(audio) {
        this.setState({  
            elapsed: this.formatMilliseconds(audio.position),
            total: this.formatMilliseconds(audio.duration),
            position: audio.position / audio.duration })
    }

    handleSongFinished () {
        this.setState({
            playStatus: Sound.status.STOPPED,
            elapsed: "00:00", 
            position: 0
        })
    }
    
    formatMilliseconds(milliseconds) {
        var minutes = Math.floor(milliseconds / 60000)
        milliseconds %= 60000
        var seconds = Math.floor(milliseconds / 1000)

        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
    
    togglePlay(){
        if(this.state.playStatus === Sound.status.PLAYING){
            this.setState({playStatus: Sound.status.PAUSED})
        } else {
            this.setState({playStatus: Sound.status.PLAYING})
        }
    }

    render() {
        return (
            <div className="audio-container">
                <Sound
                    url={this.props.url}
                    playStatus={this.state.playStatus}
                    onPlaying={this.handleSongPlaying.bind(this)}
                    playFromPosition={this.state.playFromPosition}
                    onFinishedPlaying={this.handleSongFinished.bind(this)}
                />
                <div className="title">{this.props.title}</div>

                <div>{`${this.state.elapsed} / ${this.state.total}`}</div>
                
                <div className="audio-control">
                    <div style={{textAlign:"center"}}>
                        <PlayPauseButton 
                            togglePlay={()=>{this.togglePlay()}}
                            playStatus={this.state.playStatus}
                        />
                    </div>
                    <progress value={this.state.position} max="1"/>
                </div>
            </div>
        )
    }
}

export default AudioPlayer


