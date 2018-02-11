import React from 'react';
import styled from 'styled-components/native';

import IconButton from '../components/IconButton';
import Card from './Card';
import { getGenre } from '../api/genres';

const MoviePosterContainer = styled.View`
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  overflow: hidden;
`;

const MoviePoster = styled.Image`
  height: 124px;
  width: 84px;
`;

const MovieInfoContainer = styled.View`
  flex-direction: column;
  padding-left: 16px;
  max-width: 66%;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 14px;
  color: black;
  font-weight: bold;
`;

const GenreContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const Genre = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
`;

const Year = styled.Text`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: bold;
`;

const IconContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 8px;
`;

const MovieListItem = ({ movie, RightIcon, onPress }) => (
  <Card
    style={{
      flex: 1,
      height: 124,
      marginVertical: 4,
      marginHorizontal: 8,
      borderRadius: 15,
    }}
    innerStyle={{
      flexDirection: 'row',
    }}
    onPress={onPress}
    elevation={3}
    activeElevation={5}
  >
    <MoviePosterContainer>
      <MoviePoster
        source={
          movie.poster_path
            ? { uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }
            : require('../assets/images/PosterNotAvailable.png')
        }
      />
    </MoviePosterContainer>
    <MovieInfoContainer>
      <Title>{movie.title}</Title>
      <GenreContainer>
        {movie.genre_ids.map((genre_id, index, array) => {
          if (array.length - 1 === index) {
            return <Genre key={genre_id}>{getGenre(genre_id)}</Genre>;
          }

          return <Genre key={genre_id}>{`${getGenre(genre_id)}, `}</Genre>;
        })}
      </GenreContainer>
      <Year>{movie.release_date.substring(0, 4)}</Year>
    </MovieInfoContainer>
    <IconContainer>{RightIcon}</IconContainer>
  </Card>
);

export default MovieListItem;
