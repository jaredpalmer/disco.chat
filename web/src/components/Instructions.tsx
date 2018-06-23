import * as React from 'react';
import { Block } from 'emotion-jsxstyle';

export interface InstructionsProps {}

export function Instructions() {
  return (
    <Block margin="0 auto" padding="1rem .5rem" fontSize="1rem" color="#828c99">
      <strong>Chat anonymously and ephemerally with other readers.</strong>
      <ul>
        <li>No user data is collected</li>
        <li>Each URL is it's own chat room</li>
        <li>Messages only live until you refresh the page</li>
      </ul>
    </Block>
  );
}
