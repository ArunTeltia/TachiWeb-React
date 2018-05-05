import React, { Component } from 'react';
import MangaInfoChapters from './MangaInfoChapters';

// TODO: create buttons in the header to let you select sorts and filters
// TODO: link up that header to the MangaInfo state
// TODO: pass down the new state to this component
// TODO: implement the sorting and filtering here

// The manga chapters naturally come in 'reverse' order, so flip them
const SORTS = {
  DEFAULT: list => [...list].reverse(),
  REVERSE: list => list,
};

// READ only shows chapters you've read, UNREAD is the opposite. (a little confusing I know)
const FILTERS = {
  NONE: list => list,
  READ: list =>
    [...list].filter((chapter) => {
      chapter.read;
    }),
  UNREAD: list =>
    [...list].filter((chapter) => {
      !chapter.read;
    }),
};

class SortFilterMangaInfoChapters extends Component {
  render() {
    const { chapters } = this.props;
    const sortedChapters = SORTS.DEFAULT(chapters);

    return <MangaInfoChapters chapters={sortedChapters} />;
  }
}

export default SortFilterMangaInfoChapters;