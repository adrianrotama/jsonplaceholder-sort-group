import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import Loading from '../Loading.jsx'
import IconSortAsc from '../../images/IconSortAsc'
import IconSortDesc from '../../images/IconSortDesc'

import { fetchPosts } from './JSONPlaceholderAction'

const COLORS = ["#e74c3c", "#3498db", "#9b59b6", "#2ecc71", "#e67e22"]

class JSONPlaceholder extends Component {
    constructor() {
        super()
        this.state = {
            sortType : "asc",
            sortBy : "title",
            posts: []
        }
    }
    
    componentWillMount() {
        this.props.fetchPosts().then(()=>{
            this.setState({
                posts: this.props.posts
            })
        })
    }

    getActiveClass = (type, value) => {
        return this.state[type] === value ? "active" : ""
    }

    changeSortType = (sortType) => {
        this.setState({
            sortType: sortType,
            posts: _.sortBy(this.props.posts, )
        })
    }

    renderPost = (sortType, sortBy) => {
        let posts = _.orderBy(this.props.posts, [sortBy], [sortType])
        let postResult = null

        sortBy === "title" ?
            postResult = this.renderPostByTitle(posts) :
            postResult = this.renderPostByUsername(posts)

        return (
            <div className="adaptive-content">
                {postResult}
            </div>
        )
    }

    renderPostByTitle = (posts) => {
        let result = []
        posts.forEach((post,index) => {
            result.push(
                <div className="card" key={index}>
                    <div className="card-title">{post.title}</div>
                    <div className="card-username">{post.username}</div>
                    <div>{post.body}</div>
                    <br/>
                </div>
            )   
        })

        return result
    }

    renderPostByUsername = (posts) => {
        let currentUserId = null
        let groupedPost = []
        let result = []

        posts.forEach((post,index) => {
            if(currentUserId !== post.userId){
                if(groupedPost.length > 0){
                    result.push(
                        <div className="sticky-group" key={`group${currentUserId}`}> {groupedPost} </div>
                    )
                    groupedPost = []
                }
                
                groupedPost.push(<div className="sticky-username" key={`user${currentUserId}`}> {post.username}</div>)
                currentUserId = post.userId
            } 

            groupedPost.push(
                <div className="sticky-content" key={index}> 
                    <div className="border-left" style={{color:COLORS[index%5]}}/>
                    <div className="title"> {post.title} </div>
                    <div className="body"> {post.body} </div>
                </div>
            )   
        }) 

        result.push(
            <div className="sticky-group" key={`group${currentUserId}`}> {groupedPost} </div>
        )

        return result
    }

    render() {
        return (
            this.props.isFetching ? 
                <Loading/> : 
                <div>
                    <div className="sticky-control-bar">
                        <div className="space-between adaptive-content">
                            <div className="sort-container">
                                <span className="sort-text">Sort</span>
                                <span><IconSortAsc onClick={() => this.setState({sortType: "asc"})}className={this.getActiveClass("sortType", "asc")}/></span>
                                <span><IconSortDesc onClick={() => this.setState({sortType: "desc"})} className={this.getActiveClass("sortType", "desc")}/></span>
                            </div>
                            <div className="filter-container">
                                <span onClick={() => this.setState({sortBy: "title"})} className={this.getActiveClass("sortBy", "title")}>Title</span>
                                <span onClick={() => this.setState({sortBy: "username"})} className={this.getActiveClass("sortBy", "username")}>Username</span>
                            </div>
                        </div>
                    </div>

                    {this.renderPost(this.state.sortType, this.state.sortBy)}

                </div>     
        )
    }
}

const mapStateToProps = (state) => ({
    isFetching: state.JSONPlaceholderReducer.isFetching,
    posts: state.JSONPlaceholderReducer.posts,
})

const mapDispatchToProps = (dispatch) => ({
    fetchPosts: () => dispatch(fetchPosts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(JSONPlaceholder)


