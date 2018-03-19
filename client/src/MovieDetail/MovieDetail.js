// This is the movie detail screen

import React, { Component } from 'react';
import styled from 'styled-components/native';
import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import { connect } from 'react-redux';

import Card from '../components/Card';
import screenConstants from '../utils/screenConstants';
import Icon from '../components/Icon';
import { minsToHours } from '../utils/helper';
import Button from '../components/Button';
import {
  addToWatchlist as addToWatchlistAction,
  removeFromWatchlist as removeFromWatchlistAction,
} from '../state/actions/watchlist';

const MainContainer = styled.View`
  flex: 1;
`;

const Container = styled.View``;

const MainScrollView = styled.ScrollView`
  flex: 1;
`;

const Backdrop = styled.Image`
  flex: 1;
  width: 100%;
  height: ${9 / 16 * screenConstants.width + screenConstants.statusBarHeight};
`;

const InnerContainer = styled.View`
  flex: 1;
  padding: 16px;
  padding-bottom: 0;
  max-width: ${screenConstants.width};
`;

const TopRow = styled.View`
  flex: 1;
  flex-direction: row;
`;

const MoviePosterContainer = styled.View`
  flex: 1;
  padding-right: 8px;
`;

const MoviePoster = styled.Image`
  width: 100%;
  flex: 1;
  aspect-ratio: 0.675;
`;

const MovieQuickInfo = styled.View`
  flex: 1;
  padding-left: 8px;
  padding-vertical: 8px;
  max-width: ${screenConstants.width};
`;

const Title = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: bold;
`;

const GenreContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Genre = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
`;

const Year = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
`;

const Runtime = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
`;

const BottomContainer = styled.View`
  flex: 1;
  flex-direction: column;
  padding-vertical: 16px;
  padding-bottom: 0;
  max-width: ${screenConstants.width};
`;

const OverviewTitle = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: bold;
`;

const Overview = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
  padding: 8px 0;
  max-width: ${screenConstants.width};
`;

const CrewList = styled.FlatList`
  flex: 1;
  padding-left: 12px;
  max-width: ${screenConstants.width};
`;

const CrewCardContainer = styled.View`
  justify-content: center;
  padding: 8px 4px;
`;

const CrewTitle = styled.Text`
  font-size: 14px;
  color: black;
  font-weight: bold;
`;

const CrewName = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
`;

const CrewListFooter = styled.View`
  width: 16px;
`;

const CastContainer = styled.View`
  padding: 8px 16px;
`;

const CastTitle = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: bold;
`;

const CastListContainer = styled.View`
  margin-bottom: 16px;
`;

const CastList = styled.FlatList`
  flex: 1;
  padding-left: 12px;
`;

const CastCardContainer = styled.View`
  padding: 8px 4px;
`;

const CastProfileImage = styled.Image`
  width: 124px;
  height: 150px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const CastDetailContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 8px;
`;

const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 0 4px;
  margin-top: 4px;
`;

const CrewCard = ({ crew }) => (
  <CrewCardContainer>
    <Card
      style={{
        height: '100%',
        borderRadius: 15,
      }}
      innerStyle={{
        justifyContent: 'center',
        padding: 8,
      }}
      elevation={3}
      activeElevation={6}
      onPress={() => {}}
    >
      <CrewTitle>{crew.job}</CrewTitle>
      <CrewName>{crew.name}</CrewName>
    </Card>
  </CrewCardContainer>
);

const CastCard = ({ cast }) => (
  <CastCardContainer>
    <Card
      style={{
        height: '100%',
        borderRadius: 15,
        width: 124,
      }}
      elevation={3}
      activeElevation={6}
      onPress={() => {}}
    >
      <CastProfileImage
        source={
          cast.profile_path
            ? {
                uri: `https://image.tmdb.org/t/p/w500${cast.profile_path}`,
              }
            : require('../assets/images/PosterNotAvailable.png')
        }
      />
      <CastDetailContainer>
        <CrewTitle>{cast.name}</CrewTitle>
        <CrewName>{cast.character}</CrewName>
      </CastDetailContainer>
    </Card>
  </CastCardContainer>
);

class MovieDetail extends Component {
  static navigationOptions = {
    title: 'Movie Detail',
  };

  state = {};

  keyExtractor = item => item.credit_id;

  render() {
    const {
      navigation,
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
    } = this.props;
    const { movie } = this.props.navigation.state.params;

    return (
      <MainContainer>
        <MainScrollView>
          <Backdrop
            source={
              movie.backdrop_path
                ? {
                    uri: `https://image.tmdb.org/t/p/w500${
                      movie.backdrop_path
                    }`,
                  }
                : require('../assets/images/PosterNotAvailable.png')
            }
          />
          <InnerContainer>
            <TopRow>
              <MoviePosterContainer>
                <Card
                  style={{
                    borderRadius: 15,
                    overflow: 'hidden',
                  }}
                  elevation={4}
                  activeElevation={8}
                  basic
                >
                  <MoviePoster
                    source={
                      movie.poster_path
                        ? {
                            uri: `https://image.tmdb.org/t/p/w500${
                              movie.poster_path
                            }`,
                          }
                        : require('../assets/images/PosterNotAvailable.png')
                    }
                    resizeMode="cover"
                  />
                </Card>
              </MoviePosterContainer>
              <MovieQuickInfo>
                <Title>{movie.title}</Title>
                <GenreContainer>
                  {movie.genres.map((genre, index, array) => {
                    if (array.length - 1 === index) {
                      return <Genre key={genre.id}>{genre.name}</Genre>;
                    }

                    return <Genre key={genre.id}>{`${genre.name}, `}</Genre>;
                  })}
                </GenreContainer>
                <Year>{movie.release_date.substring(0, 4)}</Year>
                <Runtime>
                  {movie.runtime > 60
                    ? `${minsToHours(movie.runtime).hours} hrs ${
                        minsToHours(movie.runtime).minutes
                      } mins`
                    : `${minsToHours(movie.runtime).minutes} mins`}
                </Runtime>
                <ButtonContainer>
                  <Button
                    title="Play Trailer"
                    icon={
                      <Icon
                        small
                        source={require('../assets/icons/Play.png')}
                      />
                    }
                    style={{
                      marginBottom: 4,
                    }}
                    textStyle={{
                      flex: 1,
                    }}
                    onPress={() =>
                      YouTubeStandaloneAndroid.playVideo({
                        apiKey: 'AIzaSyC9xM6d9S_2p4VAk6p9jTkxMzC5IZ4lTrs', // Your YouTube Developer API Key
                        videoId: movie.videos.results[0].key, // YouTube video ID
                        autoplay: true, // Autoplay the video
                      })
                    }
                  />
                  {watchlist.movies.find(watchlistMovie => watchlistMovie.movie_id === movie.id,) ? (
                    <Button
                      title="Watchlist"
                      icon={
                        <Icon
                          small
                          source={require('../assets/icons/Tick.png')}
                        />
                      }
                      style={{
                        marginTop: 4,
                      }}
                      textStyle={{
                        flex: 1,
                      }}
                      onPress={() => removeFromWatchlist(movie.id)}
                    />
                  ) : (
                    <Button
                      title="Watchlist"
                      icon={
                        <Icon
                          small
                          source={require('../assets/icons/Add.png')}
                        />
                      }
                      style={{
                        marginTop: 4,
                      }}
                      textStyle={{
                        flex: 1,
                      }}
                      onPress={() => addToWatchlist(movie.id)}
                    />
                  )}
                </ButtonContainer>
              </MovieQuickInfo>
            </TopRow>
            <BottomContainer>
              <OverviewTitle>Overview</OverviewTitle>
              <Overview>{movie.overview}</Overview>
            </BottomContainer>
          </InnerContainer>
          {movie.credits.crew.length > 0 ? (
            <CrewList
              data={movie.credits.crew}
              renderItem={({ item }) => <CrewCard crew={item} />}
              ListFooterComponent={CrewListFooter}
              keyExtractor={this.keyExtractor}
              horizontal
            />
          ) : null}

          {movie.credits.cast.length > 0 ? (
            <Container>
              <CastContainer>
                <CastTitle>Cast</CastTitle>
              </CastContainer>
              <CastListContainer>
                <CastList
                  data={movie.credits.cast}
                  renderItem={({ item }) => <CastCard cast={item} />}
                  ListFooterComponent={CrewListFooter}
                  keyExtractor={this.keyExtractor}
                  horizontal
                />
              </CastListContainer>
            </Container>
          ) : null}
        </MainScrollView>
        <Button
          title="Back"
          icon={<Icon small source={require('../assets/icons/Back.png')} />}
          style={{
            position: 'absolute',
            left: 16,
            top: 8 + screenConstants.statusBarHeight,
          }}
          innerStyle={{
            paddingLeft: 8,
          }}
          iconStyle={{
            paddingRight: 8,
          }}
          onPress={() => navigation.goBack()}
        />
      </MainContainer>
    );
  }
}

const mapStateToProps = state => ({
  watchlist: state.watchlist,
});

const mapDispatchToProps = dispatch => ({
  addToWatchlist: movie_id => dispatch(addToWatchlistAction(movie_id)),
  removeFromWatchlist: movie_id =>
    dispatch(removeFromWatchlistAction(movie_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
