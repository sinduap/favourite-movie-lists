const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');
  if (movies) {
    movieList.classList.add('visible');
  } else {
    movieList.classList.remove('visible');
  }
  movieList.innerHTML = '';

  const filteredMovies = !filter
    ? movies
    : movies.filter(movie => {
        return movie.info.title.includes(filter);
      });

  filteredMovies.forEach(movie => {
    const { info, formatTitle } = movie;
    const movieEl = document.createElement('li');
    let text = `${formatTitle.apply(movie)} - `;
    for (const key in info) {
      if (key !== 'title' && key !== '_title') {
        text += `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;
  if (extraName.trim() === '' || extraValue.trim() === '') {
    return;
  }
  const newMovie = {
    info: {
      set title(val) {
        if (val.trim() === '') {
          this._title = 'DEFAULT';
          return;
        }
        this._title = val;
      },
      get title() {
        return this._title;
      },
      [extraName]: extraValue,
    },
    id: Math.random(),
    formatTitle() {
      return this.info.title.toUpperCase();
    },
  };
  newMovie.info.title = title;
  console.log(newMovie.info.title);
  movies.push(newMovie);
  renderMovies();
  clearInput();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};

const clearInput = () => {
  document.getElementById('title').value = '';
  document.getElementById('extra-name').value = '';
  document.getElementById('extra-value').value = '';
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);
