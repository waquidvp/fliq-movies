import React, { Component } from 'react';
import styled from 'styled-components/native';
import { YouTubeStandaloneAndroid } from 'react-native-youtube';

import Header from '../components/Header';
import Card from '../components/Card';
import screenConstants from '../utils/screenConstants';
import Icon from '../components/Icon';
import { getGenre } from '../api/genres';
import { getMovieDetails, getCredits } from '../api/movie';
import { minsToHours } from '../utils/helper';
import Button from '../components/Button';

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

  state = {
    movieDetails: {},
    crew: [],
    cast: [],
  };

  componentDidMount = () => {
    this.getExtraMovieDetail();
  };

  getExtraMovieDetail = () => {
    const { movie } = this.props.navigation.state.params;

    getMovieDetails(movie.id, (movieDetails) => {
      this.setState({
        movieDetails,
      });
    });

    getCredits(movie.id, (credits) => {
      let { crew, cast } = credits;

      crew = crew.slice(0, 5);
      cast = cast.slice(0, 10);

      this.setState({
        crew,
        cast,
      });
    });
  };

  keyExtractor = item => item.id;

  render() {
    const { navigation } = this.props;
    const { movie } = this.props.navigation.state.params;
    const { movieDetails, crew, cast } = this.state;

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
                  {movie.genre_ids.map((genre_id, index, array) => {
                    if (array.length - 1 === index) {
                      return <Genre key={genre_id}>{getGenre(genre_id)}</Genre>;
                    }

                    return (
                      <Genre key={genre_id}>{`${getGenre(genre_id)}, `}</Genre>
                    );
                  })}
                </GenreContainer>
                <Year>{movie.release_date.substring(0, 4)}</Year>
                {!!movieDetails.runtime && (
                  <Runtime>
                    {movieDetails.runtime > 60
                      ? `${minsToHours(movieDetails.runtime).hours} hrs ${
                          minsToHours(movieDetails.runtime).minutes
                        } mins`
                      : `${minsToHours(movieDetails.runtime).minutes} mins`}
                  </Runtime>
                )}
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
                        videoId: movieDetails.videos.results[0].key, // YouTube video ID
                        autoplay: true, // Autoplay the video
                      })
                    }
                  />
                  <Button
                    title="Watchlist"
                    icon={
                      <Icon small source={require('../assets/icons/Add.png')} />
                    }
                    style={{
                      marginTop: 4,
                    }}
                    textStyle={{
                      flex: 1,
                    }}
                    onPress={() => {}}
                  />
                </ButtonContainer>
              </MovieQuickInfo>
            </TopRow>
            <BottomContainer>
              <OverviewTitle>Overview</OverviewTitle>
              <Overview>{movie.overview}</Overview>
            </BottomContainer>
          </InnerContainer>
          {crew.length > 0 ? (
            <CrewList
              data={crew}
              renderItem={({ item }) => <CrewCard crew={item} />}
              ListFooterComponent={CrewListFooter}
              keyExtractor={this.keyExtractor}
              horizontal
            />
          ) : null}

          {cast.length > 0 ? (
            <Container>
              <CastContainer>
                <CastTitle>Cast</CastTitle>
              </CastContainer>
              <CastListContainer>
                <CastList
                  data={cast}
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

export default MovieDetail;
