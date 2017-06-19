// @flow
import React from 'react';

type Props = {
  value: string,
  onChange: Function,
}

export default function EditableItem(props: Props) {
  return (
    <input className="editable-item" type="text" value={props.value} onChange={e => props.onChange(e.currentTarget.value)}/>
  );
}
