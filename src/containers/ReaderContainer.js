import { connect } from 'react-redux';
import { fetchMangaInfo } from 'redux-ducks/mangaInfos';
import { fetchChapters, updateReadingStatus } from 'redux-ducks/chapters';
import { fetchPageCount } from 'redux-ducks/pageCounts';
import Reader from 'pages/Reader';

const mapStateToProps = (state, ownProps) => {
  const { mangaInfos, chapters, pageCounts } = state;
  const { mangaId, chapterId } = ownProps.match.params;

  return {
    mangaInfo: mangaInfos[mangaId],
    chapters: chapters[mangaId],
    chapter: findChapter(chapters[mangaId], chapterId),
    chapterId: parseInt(chapterId, 10),
    pageCounts,
    pageCount: pageCounts[chapterId],
    page: parseInt(ownProps.match.params.page, 10),
    prevChapterId: getPrevChapterId(chapters[mangaId], chapterId),
    nextChapterId: getNextChapterId(chapters[mangaId], chapterId),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { mangaId } = ownProps.match.params;

  return {
    fetchMangaInfo: () => dispatch(fetchMangaInfo(mangaId)),
    fetchChapters: () => dispatch(fetchChapters(mangaId)),
    fetchPageCount: chapterId => dispatch(fetchPageCount(mangaId, chapterId)),
    updateReadingStatus: (chapter, pageCount, readPage) =>
      dispatch(updateReadingStatus(mangaId, chapter, pageCount, readPage)),
  };
};

// Helper functions
function findChapter(chapters, chapterId) {
  if (!chapters || chapters.length === 0) return null;

  return chapters.find(chapter => chapter.id === parseInt(chapterId, 10));
}

function findChapterIndex(chapters, thisChapterId) {
  // If not found, returns -1. BUT this shouldn't ever happen.
  return chapters.findIndex(chapter => chapter.id === parseInt(thisChapterId, 10));
}

function getPrevChapterId(chapters, thisChapterId) {
  if (!chapters) return null;

  const thisChapterIndex = findChapterIndex(chapters, thisChapterId);
  if (thisChapterIndex === 0) {
    return null;
  }
  return chapters[thisChapterIndex - 1].id;
}

function getNextChapterId(chapters, thisChapterId) {
  if (!chapters) return null;

  const thisChapterIndex = findChapterIndex(chapters, thisChapterId);
  if (thisChapterIndex === chapters.length - 1) {
    return null;
  }
  return chapters[thisChapterIndex + 1].id;
}

export default connect(mapStateToProps, mapDispatchToProps)(Reader);
