import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import 'rc-slider/assets/index.css';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Client } from 'api';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

const SliderWithTooltip = createSliderWithTooltip(Slider);

// need whiteSpace: 'pre' so it doesn't wrap. rc-slider's width was forcing them to be too small
const marginSlider = 24;
const marginButton = 8;
const styles = {
  leftText: {
    whiteSpace: 'pre',
    marginLeft: marginButton,
    marginRight: marginSlider,
  },
  rightText: {
    whiteSpace: 'pre',
    marginLeft: marginSlider,
    marginRight: marginButton,
  },
};

// rc-slider is finicky. Use state.sliderValue as the value of the slider at all times
// update it onChange, and use onAfterChange to fire any actual events

// FIXME: I added some CSS to index.css
//        ReaderOverlay has a z-index, which is interfering with the tooltip.
//        Ideally, this CSS wouldn't be necessary

// TODO: Refactor the shit out of this, use new components

class PageSlider extends Component {
  static getDerivedStateFromProps(nextProps) {
    // Set the initial sliderValue to always reflect the page # in the URL
    // 1 indexed for human readability
    return { sliderValue: nextProps.page + 1 };
  }

  constructor(props) {
    super(props);

    this.state = {
      sliderValue: 1,
    };

    this.updateSliderValue = this.updateSliderValue.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  updateSliderValue(value) {
    this.setState({ sliderValue: value });
  }

  changePage(newPage) {
    const { mangaId, chapterId } = this.props;
    this.props.history.push(Client.page(mangaId, chapterId, newPage - 1));
  }

  render() {
    const {
      mangaId, pageCount, page, prevChapterId, nextChapterId,
    } = this.props;
    const { sliderValue } = this.state;

    return (
      <React.Fragment>
        <IconButton
          component={Link}
          to={Client.page(mangaId, prevChapterId, 0)}
          disabled={!prevChapterId}
        >
          <Icon>skip_previous</Icon>
        </IconButton>
        <Typography className={this.props.classes.leftText}>{`Page ${page + 1}`}</Typography>
        <SliderWithTooltip
          min={1}
          max={pageCount}
          value={sliderValue}
          onChange={this.updateSliderValue}
          onAfterChange={this.changePage}
          tipFormatter={value => `Page ${value}`}
        />
        <Typography className={this.props.classes.rightText}>{pageCount}</Typography>
        <IconButton
          component={Link}
          to={Client.page(mangaId, nextChapterId, 0)}
          disabled={!nextChapterId}
        >
          <Icon>skip_next</Icon>
        </IconButton>
      </React.Fragment>
    );
  }
}

PageSlider.propTypes = {
  mangaId: PropTypes.number.isRequired,
  chapterId: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  prevChapterId: PropTypes.number,
  nextChapterId: PropTypes.number,
  // Classes is the injected styles
  classes: PropTypes.object.isRequired,
  // Below are react-router props injected with withRouter
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

PageSlider.defaultProps = {
  prevChapterId: null,
  nextChapterId: null,
};

export default withStyles(styles)(withRouter(PageSlider));