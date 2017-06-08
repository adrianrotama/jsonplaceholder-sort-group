import React, { Component } from "react"

export default class PlayPauseButton extends Component {

    render() {
        return (
            <div className={`btn ${this.props.playStatus === 'PLAYING' ? "pause" : "play"}`} onClick={this.props.togglePlay}>
                <span className="bar bar-1"></span>
                <span className="bar bar-2"></span>				
            </div>
        )
    }
}