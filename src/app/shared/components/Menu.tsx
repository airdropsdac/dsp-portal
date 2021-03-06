import React from 'react';
import { observer } from 'mobx-react';
import styled, { css } from 'styled-components';
import onClickOutside from 'react-onclickoutside';

import sixDotsIcon from 'app/shared/icons/six_dots_icon.svg';
import { lightDarkValues } from '../styles/utils';

export const _MenuWrapper = styled.div<any>`
  position: relative;
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.4 : 1)};
`;

export const _MenuInput = styled.div<any>`
  position: relative;
  background-color: ${props =>
    props.transparentBg ? 'transparent' : lightDarkValues('#e7ebf2', '#263040')};
  border-radius: 4px;
  border: none;
  width: 100%;
  padding: 16px 18px;
  color: #67768e;
  font-size: 14px;
  font-weight: 600;
`;

export const _Icon = styled.img`
  position: absolute;
  width: 14px;
  top: 18px;
  right: 18px;
`;

export const _OptionsList = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
  margin-top: 4px;
  padding: 4px 0;
  background-color: ${lightDarkValues('#e7ebf2', '#263040')};
  border-radius: 4px;
`;

export const _OptionItem = styled.div<any>`
  padding: 12px 18px;
  font-size: 15px;
  color: ${lightDarkValues('#555', '#eee')};

  ${props =>
    props.active &&
    `
      background-color: ${lightDarkValues('#c1c5cc', '#0b1422')};
      color: ${lightDarkValues('#555', '#67768e')};
    `}

  &:hover {
    background-color: ${lightDarkValues('#c1c5cc', '#0b1422')};
  }
`;

type Props = {
  id?: string;
  text: string;
  disabled?: boolean;
  transparentBg?: boolean;
  options: Array<{
    content: React.ReactNode;
    value?: any;
    isActive?: boolean;
    onClick: (...any) => any;
  }>;
};

export const menuFactory = ({
  MenuWrapper = _MenuWrapper,
  MenuInput = _MenuInput,
  Icon = _Icon,
  iconSrc = sixDotsIcon,
  OptionsList = _OptionsList,
  OptionItem = _OptionItem,
} = {}) => {
  class Menu extends React.Component<Props> {
    state = { isOpen: false };

    toggleIsOpen = () => this.setState({ isOpen: !this.state.isOpen });

    handleClickOutside = () => {
      if (this.state.isOpen) this.setState({ isOpen: false });
    };

    render() {
      const { id, text, options, disabled, transparentBg = false } = this.props;

      return (
        <MenuWrapper id={id} onClick={this.toggleIsOpen} disabled={disabled}>
          <MenuInput transparentBg={transparentBg}>
            {text}
            <Icon src={iconSrc} />
          </MenuInput>

          {this.state.isOpen && (
            <OptionsList>
              {options.map(option => (
                <OptionItem
                  active={option.isActive}
                  onClick={() => option.onClick(option.value)}
                  key={option.value}
                >
                  {option.content}
                </OptionItem>
              ))}
            </OptionsList>
          )}
        </MenuWrapper>
      );
    }
  }

  return onClickOutside(observer(Menu));
};

const Menu = menuFactory();

export default Menu;
