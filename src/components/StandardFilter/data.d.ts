import React from 'react';
import PropTypes from 'prop-types';
export interface StandardFilterProps {
  buttonGroup: PropTypes.ReactNodeArray,
  formItemGroup: PropTypes.ReactNodeArray,
  onFilterSearch: () => void,
  onFilterReset: () => void,
}
