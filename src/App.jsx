import React from 'react'
import { Link, browserHistory as history } from 'react-router'

class App extends React.Component {

    getClassName = (path) => {
        return this.props.location.pathname === path ? "link active" : "link" 
    }

    render() {
        return (
            <div className="main-app">
                <header className="main-header">
                    <div className="top-bar adaptive-content">
                        <Link to="/" className="title">SampleApp</Link>
                        <Link to="/" className={this.getClassName("/")}>Post</Link>
                        <Link to="audio" className={this.getClassName("audio")}>Audio</Link>
                    </div>
                </header>
                <main className="main-content">
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default App
