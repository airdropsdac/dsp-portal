import React from 'react';
import styled from 'styled-components';

import pageBg from 'app/shared/assets/page_bg.png';
import { lightDarkValues } from 'app/shared/styles/utils';

const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  z-index: 1;

  ::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    content: '';
    z-index: -1;
    background: ${lightDarkValues('#fff', '#10131f')} url(${pageBg}) no-repeat top center;
    background-size: 1920px auto;
    opacity: ${lightDarkValues(0.1, 1)};
  }
`;

export default PageWrapper;
