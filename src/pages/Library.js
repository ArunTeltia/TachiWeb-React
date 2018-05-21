import React, { Component } from 'react';
import LibraryHeader from 'components/LibraryHeader';
import MangaGrid from 'components/MangaGrid';
import LibraryMangaCard from 'components/LibraryMangaCard';
import PropTypes from 'prop-types';
import { mangaType } from 'types';
import FullScreenLoading from 'components/loading/FullScreenLoading';

// TODO: sort/filter mangaLibrary

// NOTE: unread count relies on the server knowing how many chapters there are
//       If for some reason the server hasn't scraped a list of chapters, this number won't appear

class Library extends Component {
  constructor(props) {
    super(props);

    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchLibrary();
    this.props.fetchUnread();
  }

  handleRefreshClick() {
    this.props.fetchLibrary({ ignoreCache: true });
  }

  render() {
    const { mangaLibrary, unread, libraryIsLoading } = this.props;

    return (
      <React.Fragment>
        <LibraryHeader onRefreshClick={this.handleRefreshClick} />

        <MangaGrid
          mangaLibrary={mangaLibrary}
          cardComponent={<LibraryMangaCard unread={unread} />}
        />

        {libraryIsLoading && <FullScreenLoading />}
      </React.Fragment>
    );
  }
}

Library.propTypes = {
  mangaLibrary: PropTypes.arrayOf(mangaType),
  unread: PropTypes.object.isRequired,
  libraryIsLoading: PropTypes.bool.isRequired,

  fetchLibrary: PropTypes.func.isRequired,
  fetchUnread: PropTypes.func.isRequired,
};

Library.defaultProps = {
  mangaLibrary: [],
};

export default Library;
