import { connect } from 'react-redux';
import { fetchLibrary } from 'redux-ducks/library';
import { fetchChapters } from 'redux-ducks/chapters';
import { fetchPageCount } from 'redux-ducks/pageCounts';
import Reader from 'pages/Reader';

// Currently this is mostly a copy paste from MangaInfoContainer

const mapStateToProps = (state, ownProps) => {
  const { library } = state;
  const { chapters } = state.chapters;
  const { pageCountsByMangaId } = state.pageCounts;
  const { mangaId, chapterId } = ownProps.match.params;

  return {
    mangaInfo: getThisManga(library.mangaLibrary, mangaId),
    chapters: chapters[mangaId],
    chapter: chapters[mangaId] ? findChapter(chapters[mangaId], chapterId) : null,
    pageCount: pageCountsByMangaId[mangaId] ? pageCountsByMangaId[mangaId][chapterId] : null,
    page: parseInt(ownProps.match.params.page, 10),
    prevChapterId: chapters[mangaId] ? getPrevChapterId(chapters[mangaId], chapterId) : null,
    nextChapterId: chapters[mangaId] ? getNextChapterId(chapters[mangaId], chapterId) : null,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { mangaId, chapterId } = ownProps.match.params;

  return {
    fetchLibrary: () => dispatch(fetchLibrary()),
    fetchChapters: () => dispatch(fetchChapters(mangaId)),
    fetchPageCount: () => dispatch(fetchPageCount(mangaId, chapterId)),
  };
};

// Helper functions
function getThisManga(mangaLibrary, mangaId) {
  return mangaLibrary.find(manga => manga.id === parseInt(mangaId, 10));
}

function findChapter(chapters, chapterId) {
  return chapters.find(chapter => chapter.id === parseInt(chapterId, 10));
}

function findChapterIndex(chapters, thisChapterId) {
  // If not found, returns -1. BUT this shouldn't ever happen.
  return chapters.findIndex(chapter => chapter.id === parseInt(thisChapterId, 10));
}

function getPrevChapterId(chapters, thisChapterId) {
  const thisChapterIndex = findChapterIndex(chapters, thisChapterId);
  if (thisChapterIndex === 0) {
    return null;
  }
  return chapters[thisChapterIndex - 1].id;
}

function getNextChapterId(chapters, thisChapterId) {
  const thisChapterIndex = findChapterIndex(chapters, thisChapterId);
  if (thisChapterIndex === chapters.length - 1) {
    return null;
  }
  return chapters[thisChapterIndex + 1].id;
}

export default connect(mapStateToProps, mapDispatchToProps)(Reader);