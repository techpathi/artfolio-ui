import React, { Component } from 'react';
import './profile.css';
import axios from 'axios';
import Review from '../review/Review';

const APIURL = process.env.REACT_APP_API_URL;

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profileData: [],
            showReviews: true,
            rating: 1,
            loading: true
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        localStorage.removeItem('currentVendorId');
    }

    getData() {
        axios.get(`${APIURL}/${localStorage.getItem('currentVendorId')}`).then(
            (data) => {
                this.setState({ profileData: data.data });
                localStorage.setItem('vendorId', this.props.location.vendorId);
                this.calculateRating(this.state.profileData.reviews);
                this.setState({ loading: false });
            }
        )
    }


    calculateRating(reviews) {
        let averageRating = 0;
        for (let reviewIndex in reviews) {
            let reviewItem = reviews[reviewIndex];
            averageRating = averageRating + Number(reviewItem.vendor_rating);
        }
        averageRating = (averageRating) / (reviews.length);
        this.setState({ rating: Math.ceil(averageRating) });
    }

    toggleReviews = () => {
        if (this.state.showReviews) {
            this.setState({ showReviews: false })
        }
        else {
            this.setState({ showReviews: true })
        }
    }

    renderRating() {

        let ratingItems = []
        let checked = this.state.rating;
        let unchecked = 5 - checked;
        for (let i = 0; i < checked; i++) {
            ratingItems.push(<span className="fa fa-star checked"></span>
            );
        }

        for (let i = 0; i < unchecked; i++) {
            ratingItems.push(<span className="fa fa-star"></span>
            );
        }
        return ratingItems;
    }

    renderSidebar(avatar, name, city, country, artistType, collections, followers, following) {
        return (
            <div>
                <div className="avatar-row">
                    <img className="img-thumbnail img-fluid avatar rounded mx-auto d-block" alt="user-avatar" src={avatar} />
                </div>
                <div className="rating-row">
                    {this.renderRating()}
                </div>
                <div className="about-row">
                    <div>
                        <div className="item">
                            <h3>{name}</h3>
                        </div>
                        <div className="item">
                            <h5>{artistType}</h5>
                        </div>
                        <div className="item">
                            <i className="fa fa-map-marker" aria-hidden="true"></i> <h5>{city}, {country}</h5>
                        </div>
                    </div>
                </div>
                <div className="stats-row">
                    <div className="count">
                        <h2>{collections}</h2>
                        <p>
                            Collections
                        </p>
                    </div>
                    <div className="count">
                        <h2>{followers}</h2>
                        <p>
                            Followers
                        </p>
                    </div>
                    <div className="count">
                        <h2>{following}</h2>
                        <p>
                            Following
                        </p>
                    </div>

                </div>
            </div>
        );

    }

    renderMedia(mediaList) {
        const mediaItems = []
        let images = [], videos = [], imagesData = [], videosData = [];
        for (let mediaIndex in mediaList) {
            let mediaItem = mediaList[mediaIndex];
            if (mediaItem.media_type === "1") {
                imagesData.push(mediaItem);
            }
            if (mediaItem.media_type === "2") {
                videosData.push(mediaItem);
            }
        }

        imagesData.forEach(
            (imageData) => {
                images.push(<img className="img-fluid img-thumbnail image-item" src={imageData.media_url} alt="portfolio-image" />);
            }
        );
        console.log(videosData);
        videosData.forEach(
            (videoData) => {
                videos.push(
                    <div>
                        <video className="video-item" controls>
                            <source src={videoData.media_url} type="video/mp4" />
                        </video>
                    </div>
                );
            }
        );

        return mediaItems.concat(images, videos);
    }

    renderFeed(about, mediaList, reviews) {
        return (
            <div>
                <div className="row">
                    <h2 style={{ color: 'gray' }}>BIOGRAPHY</h2>
                    <p>{about}</p>
                </div>

                <div className="row review-list">
                    <a className="" onClick={this.toggleReviews} style={{ fontSize: 'large' }} >
                        <large style={{ color: 'gray', fontWeight: 'bold' }}>REVIEWS</large> <span>  <i class={this.state.showReviews ? 'fa fa-plus-square-o' : 'fa fa-minus-square-o'} aria-hidden="true"></i> </span>
                    </a>
                    <div className={`card card-body ${this.state.showReviews ? 'hidden' : 'show'}`}>
                        {this.renderReviews(reviews)}
                    </div>
                </div>
                <div className="row media-list">
                    <h4 style={{ textAlign: 'center' }}>Here's the best shots i have clicked</h4>
                    {
                        this.renderMedia(mediaList)
                    }
                </div>
            </div>
        );
    }

    renderReviews(reviews) {
        const reviewItems = []
        for (let reviewIndex in reviews) {
            let reviewItem = reviews[reviewIndex];
            reviewItems.push(
                <Review customerName={reviewItem.customer_name} date={reviewItem.rated_date} comments={reviewItem.review_comments} rating={reviewItem.vendor_rating} />
            );
        }
        return reviewItems;
    }

    render() {

        if (this.state.loading) {
            return (
                <div className="loader">
                    <h2 style={{ textAlign: 'center' }}>Hang on! I am grabbing the artist from our library...</h2>
                </div>);
        }
        else {
            let name, avatar, city, country, artistType, postCount, followers, following, about, reviews, media;
            const profileData = this.state.profileData;
            if (profileData) {
                avatar = profileData.avatar;
                name = profileData.name;
                city = profileData.city;
                country = profileData.country;
                artistType = profileData.artistType;
                postCount = profileData.postCount;
                followers = profileData.followers;
                following = profileData.following
                about = profileData.about;
                media = profileData.media;
                reviews = profileData.reviews;
            }
            return (
                <React.Fragment>
                    <div className="profile-parent">
                        <div className="sidebar">
                            {this.renderSidebar(avatar, name, city, country, artistType, postCount, followers, following)}
                        </div>
                        <div className="feed">
                            {this.renderFeed(about, media, reviews)}
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default Profile;