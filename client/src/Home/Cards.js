import React, { Component } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-deck-swiper';
import { connect } from 'react-redux';

import MovieCard from './components/MovieCard';
import { recommend as recommendAction } from '../state/actions/recommend';
import Loading from '../components/Loading';
import { getWatchlist, getWatchedList } from '../state/actions/watchlist';
import { addToLikedlist } from '../state/actions/ratings';

const MainContainer = styled.View`
  flex: 1;
`;

class Cards extends Component {
  static navigationOptions = {
    tabBarLabel: 'For you',
    swipeEnabled: false,
  };

  state = {
    movieDetails: null,
  };

  componentDidMount() {
    this.getRecommendations();

    this.props.getWatchlist();
    this.props.getWatchedList();
  }

  getRecommendations = () => {
    const { getRecommendations } = this.props;
    getRecommendations();
  };

  setMovieDetail = (movieDetail) => {
    const { movieDetails } = this.state;

    const movieDetailsId = movieDetail.id;

    this.setState({
      movieDetails: {
        ...movieDetails,
        [movieDetailsId]: movieDetail,
      },
    });
  };

  render() {
    const {
      recommend: { recommendLoading, recommendations },
      likeMovie,
    } = this.props;
    const { mainNavigation } = this.props.screenProps;
    const { movieDetails } = this.state;

    return (
      <MainContainer>
        {recommendLoading ? (
          <Loading />
        ) : (
          <Swiper
            cards={recommendations}
            renderCard={movieId => (
              <MovieCard
                movieId={movieId}
                setMovieDetail={this.setMovieDetail}
              />
            )}
            onTapCard={index =>
              mainNavigation.navigate('MovieDetail', {
                movie: movieDetails[recommendations[index]],
              })
            }
            onSwipedRight={index => likeMovie(recommendations[index])}
            cardIndex={0}
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            backgroundColor="#FFFFFF00"
            cardStyle={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: 'auto',
              height: 'auto',
            }}
            verticalSwipe={false}
            outputRotationRange={['-5deg', '0deg', '5deg']}
            overlayOpacityHorizontalThreshold={10}
            overlayLabels={{
              left: {
                title: 'Dislike',
                style: {
                  label: {
                    backgroundColor: '#FE1A1A',
                    color: 'white',
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30,
                    elevation: 8,
                  },
                },
              },
              right: {
                title: 'Like',
                style: {
                  label: {
                    backgroundColor: '#7EF482',
                    color: 'white',
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30,
                    elevation: 8,
                  },
                },
              },
            }}
          />
        )}
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  recommend: state.recommend,
});

const mapDispatchToProps = dispatch => ({
  getRecommendations: () => dispatch(recommendAction()),
  getWatchlist: () => dispatch(getWatchlist()),
  getWatchedList: () => dispatch(getWatchedList()),
  likeMovie: movie_id => dispatch(addToLikedlist(movie_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
