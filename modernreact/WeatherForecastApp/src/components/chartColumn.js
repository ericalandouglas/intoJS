
import React from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import R from 'ramda';

const average = (data) => {
  return (R.sum(data) / R.length(data)).toFixed(0);
};

export default (props) => {
  return (
    <td>
      <Sparklines height={120} width={180} data={props.data}>
        <SparklinesLine color={props.color} />
        <SparklinesReferenceLine type="avg" />
      </Sparklines>
      <div>{average(props.data)} {props.units}</div>
    </td>
  );
}

