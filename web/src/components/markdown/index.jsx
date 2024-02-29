import React, { useEffect } from 'react';
import { md } from '../../utils/markdown';

export const Markdown = (props) => <div className="markdown-body" dangerouslySetInnerHTML={{ __html: md.render(props.value) }} />

