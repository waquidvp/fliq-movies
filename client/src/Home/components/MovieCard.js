import React from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { YouTubeStandaloneAndroid } from 'react-native-youtube';

import Loading from '../../components/Loading';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

import { getMovieDetails } from '../../api/movie';
import { minsToHours } from '../../utils/helper';
import {
  addToWatchlist as addToWatchlistApi,
  removeFromWatchlist as removeFromWatchlistApi,
} from '../../state/actions/watchlist';

const MainCard = styled.View`
  flex: 1;
  background-color: white;
  margin: 16px;
  border-radius: 15px;
  elevation: 6;
  z-index: 6;
  padding: 1px;
  shadow-color: #000000;
  shadow-offset: 0 5px;
  shadow-opacity: 0.3;
  shadow-radius: 5;
`;

const Backdrop = styled.Image`
  flex: 1;
  border-radius: 15px;
  opacity: 0.95;
`;

const OverBackdrop = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 16px;
`;

const OverBackdropTop = styled.View`
  flex: 8;
  flex-direction: row;
`;

const OverBackdropMiddle = styled.View`
  flex: 2;
  justify-content: center;
`;

const OverBackdropFooter = styled.View`
  flex: 6;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Spacer = styled.View`
  width: 10px;
`;

const Poster = styled.Image`
  height: 100%;
  max-width: 50%;
  border-radius: 15px;
  aspect-ratio: 0.675;
`;

const BasicInfoContainer = styled.View`
  flex: 1;
  padding-top: 10%;
`;

const BasicInfoCard = styled.View`
  background-color: white;
  padding: 12px;
  elevation: 6px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: bold;
`;

const Year = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
`;

const GenreContainer = styled.View`
  margin: 2px 0;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Genre = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
`;

const Runtime = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
`;

const OverviewContainer = styled.View`
  padding: 16px;
  background-color: white;
  border-radius: 15px;
  elevation: 6;
  flex: 1;
`;

const Overview = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.87);
  font-weight: bold;
  flex-wrap: wrap;
  flex: 1;
`;

class MovieCard extends React.Component {
  state = {
    loading: false,
    movieDetails: {},
  };

  componentWillMount() {
    const { movieId, setMovieDetail } = this.props;

    this.setState({
      loading: true,
    });

    getMovieDetails(movieId).then((movieDetails) => {
      this.setState({
        loading: false,
        movieDetails,
      });

      setMovieDetail(movieDetails);
    });
  }

  render() {
    const { loading, movieDetails } = this.state;
    const { watchlist, addToWatchlist, removeFromWatchlist } = this.props;

    if (loading) return <Loading />;

    return (
      <MainCard>
        <Backdrop
          source={
            movieDetails.backdrop_path
              ? {
                  uri: `https://image.tmdb.org/t/p/w500${
                    movieDetails.backdrop_path
                  }`,
                }
              : require('../../assets/images/PosterNotAvailable.png')
          }
          blurRadius={1}
        />
        <OverBackdrop>
          <OverBackdropTop>
            <Poster
              source={
                movieDetails.poster_path
                  ? {
                      uri: `https://image.tmdb.org/t/p/w500${
                        movieDetails.poster_path
                      }`,
                    }
                  : require('../../assets/images/PosterNotAvailable.png')
              }
              resizeMode="cover"
            />
            <BasicInfoContainer>
              <BasicInfoCard>
                <Title>{movieDetails.title}</Title>
                <Year>{movieDetails.release_date.substring(0, 4)}</Year>
                <GenreContainer>
                  {movieDetails.genres.map((genre, index, array) => {
                    if (array.length - 1 === index) {
                      return <Genre key={genre.id}>{genre.name}</Genre>;
                    }

                    return <Genre key={genre.id}>{`${genre.name}, `}</Genre>;
                  })}
                </GenreContainer>
                <Runtime>
                  {movieDetails.runtime > 60
                    ? `${minsToHours(movieDetails.runtime).hours} hrs ${
                        minsToHours(movieDetails.runtime).minutes
                      } mins`
                    : `${minsToHours(movieDetails.runtime).minutes} mins`}
                </Runtime>
              </BasicInfoCard>
            </BasicInfoContainer>
          </OverBackdropTop>
          <OverBackdropMiddle>
            <ButtonContainer>
              <Button
                title="Play Trailer"
                icon={
                  <Icon small source={require('../../assets/icons/Play.png')} />
                }
                style={{
                  flex: 1,
                }}
                textStyle={{
                  flex: 1,
                }}
                onPress={() =>
                  YouTubeStandaloneAndroid.playVideo({
                    apiKey: 'AIzaSyC9xM6d9S_2p4VAk6p9jTkxMzC5IZ4lTrs', // Your YouTube Developer API Key
                    videoId: movieDetails.videos.results[0].key, // YouTube video ID
                    autoplay: true, // Autoplay the video
                  })
                }
              />
              <Spacer />
              {watchlist.movies.find((movie) => movieDetails.id === movie.movie_id) ? (
                <Button
                  title="Watchlist"
                  icon={
                    <Icon
                      small
                      source={require('../../assets/icons/Tick.png')}
                    />
                  }
                  style={{
                    flex: 1,
                  }}
                  textStyle={{
                    flex: 1,
                  }}
                  onPress={() => removeFromWatchlist(movieDetails.id)}
                />
              ) : (
                <Button
                  title="Watchlist"
                  icon={
                    <Icon
                      small
                      source={require('../../assets/icons/Add.png')}
                    />
                  }
                  style={{
                    flex: 1,
                  }}
                  textStyle={{
                    flex: 1,
                  }}
                  onPress={() => addToWatchlist(movieDetails.id)}
                />
              )}
            </ButtonContainer>
          </OverBackdropMiddle>
          <OverBackdropFooter>
            <OverviewContainer>
              <Overview numberOfLines={8}>{movieDetails.overview}</Overview>
            </OverviewContainer>
          </OverBackdropFooter>
        </OverBackdrop>
      </MainCard>
    );
  }
}

const mapStateToProps = state => ({
  watchlist: state.watchlist,
});

const mapDispatchToProps = dispatch => ({
  addToWatchlist: movie_id => dispatch(addToWatchlistApi(movie_id)),
  removeFromWatchlist: movie_id => dispatch(removeFromWatchlistApi(movie_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);
