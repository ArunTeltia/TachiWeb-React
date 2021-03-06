// @flow
import React, { memo, createContext, useContext } from "react";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ChapterListItem from "components/MangaInfo/ChapterListItem";
import type { ChapterType } from "types";
import type { Manga } from "@tachiweb/api-client";
import { makeStyles } from "@material-ui/styles";
import { FixedSizeList, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

// TODO: I've made Container maxWidth="md". What happens when the chapter title is too long?

// Since I want this to fill the remaining vertical screen space, I'm relying on flexbox.
// The parent of this component should use something like this:
// parent: {
//   height: "100%",
//   display: "flex",
//   flexDirection: "column"
// }

// https://react-window.now.sh/#/examples/list/memoized-list-items

type Props = {
  mangaInfo: Manga,
  chapters: Array<ChapterType>
};

const RowContext = createContext();

type RowProps = {
  index: number,
  style: Object,
  data: ChapterType
};
const Row = memo<RowProps>(({ index, style, data }: RowProps) => {
  const mangaInfo = useContext(RowContext);
  return (
    <ChapterListItem
      style={style}
      chapter={data[index]}
      mangaInfo={mangaInfo}
    />
  );
}, areEqual);

const useStyles = makeStyles({
  virtualizedListParent: {
    flexGrow: 1,
    marginBottom: 16
  },
  list: {
    height: "100%"
  }
});

const ChapterList = ({ mangaInfo, chapters }: Props) => {
  const classes = useStyles();

  if (!chapters.length) return null;

  return (
    <Container maxWidth="sm" className={classes.virtualizedListParent}>
      <List className={classes.list}>
        <RowContext.Provider value={mangaInfo}>
          {/* itemSize is hard coded using what I saw in the inspector */}
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                height={height}
                width={width}
                itemSize={73}
                itemCount={chapters.length}
                itemData={chapters}
                itemKey={(index, data) => data[index].id}
                overscanCount={10}
              >
                {Row}
              </FixedSizeList>
            )}
          </AutoSizer>
        </RowContext.Provider>
      </List>
    </Container>
  );
};

export default ChapterList;
