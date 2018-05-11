import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mangaType } from 'types';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import MangaGrid from 'components/MangaGrid';
import CatalogueMangaCard from 'components/CatalogueMangaCard';

// TODO: sources type
// TODO: filter type?

class Catalogue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Select based on index of the array instead of id
      // this makes it less reliant on having to sync state with the data
      value: 0,
    };

    this.handleSourceChange = this.handleSourceChange.bind(this);
  }

  componentDidMount() {
    const { fetchSources, fetchCatalogue } = this.props;
    // I think there's a bug in babel. I should be able to reference 'this' (in the outer scope)
    // when using an arrow function, but it's undefined. So I'm manually binding 'this'.
    const that = this;
    fetchSources().then(() => {
      fetchCatalogue(that.props.sources[0].id);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state;
    const { sources, fetchCatalogue } = this.props;

    if (value !== prevState.value) {
      fetchCatalogue(sources[value].id);
    }
  }

  handleSourceChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { mangaLibrary, sources } = this.props;

    return (
      <React.Fragment>
        <form autoComplete="off">
          <FormControl>
            <Select value={this.state.value} onChange={this.handleSourceChange}>
              {sources.map((source, index) => (
                <MenuItem value={index} key={source.id}>
                  {source.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>

        <MangaGrid mangaLibrary={mangaLibrary} cardComponent={<CatalogueMangaCard />} />
      </React.Fragment>
    );
  }
}

Catalogue.propTypes = {
  mangaLibrary: PropTypes.arrayOf(mangaType),
  sources: PropTypes.array, // TODO: type
  page: PropTypes.number.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  filters: PropTypes.array, // TODO: type
  fetchSources: PropTypes.func.isRequired,
  fetchCatalogue: PropTypes.func.isRequired,
};

Catalogue.defaultProps = {
  mangaLibrary: null,
  sources: null,
  filters: null,
};

export default Catalogue;
