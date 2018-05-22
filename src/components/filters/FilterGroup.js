// @flow
import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import FormGroup from '@material-ui/core/FormGroup';
import FilterTristate from './FilterTristate';

type Props = {
  name: string,
  // array of nested filter options
  state: Array<any>, // TODO: type this
  onChange: Function,
};

// NOTE: Assuming that GROUP will only contain TRISTATE children

const FilterGroup = ({ name, state, onChange }: Props) => (
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
      <Typography>{name}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <FormGroup>
        {state.map((tristate, nestedIndex) => (
          <FilterTristate
            name={tristate.name}
            state={tristate.state}
            onChange={onChange(nestedIndex)}
            key={nestedIndex}
          />
          ))}
      </FormGroup>
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default FilterGroup;
