import React from 'react';
import styled from 'styled-components';

import onClickOutside from 'react-onclickoutside';
import checkboxChecked from 'app/shared/icons/checkbox_checked.svg';
import checkboxUnchecked from 'app/shared/icons/checkbox_unchecked.svg';
import cronIcon from 'app/shared/icons/cron.svg';
import ifpIcon from 'app/shared/icons/ifp.svg';
import oracleIcon from 'app/shared/icons/oracle.svg';

import Input from 'app/shared/components/Input';
import Button from 'app/shared/components/Button';
import DappPackage from '../state/DappPackage';
import StakedPackage from '../state/StakedPackage';
import { observer } from 'mobx-react';
import StakingIcon from 'app/shared/components/StakingIcon';
import { formatAsset } from 'app/shared/eos';
import { DAPP_SYMBOL, DAPPHODL_SYMBOL } from 'app/shared/eos/constants';

const MOBILE_WIDTH = 671;

const CardWrapper = styled.div<any>`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: 304px;
  padding: 24px 16px;
  margin: 16px;
  border-radius: 8px;
  background: linear-gradient(320deg, rgba(24, 24, 36, 1) 0%, rgba(40, 46, 61, 1) 100%);
  cursor: ${props => (props.isSelected ? 'default' : 'pointer')};

  opacity: ${props => (props.isHidden ? 0.1 : 1)};
  margin-bottom: ${props => (props.isSelected ? -120 : 16)}px;
  z-index: ${props => (props.isSelected ? 1 : 'auto')};

  transition: opacity 0.2s ease;

  @media (max-width: ${MOBILE_WIDTH}px) {
    width: calc(100% - 32px);
  }
`;

const TitleAndCheckboxWrapper = styled.div<any>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const ServiceIconAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

const ServiceIcon = styled.img``;

const ServiceName = styled.div`
  color: ${props => props.color};
  margin-left: 8px;
`;

const DetailsWrapper = styled.div`
  font-size: 14px;
  min-height: 64px;
`;

const DetailsBlock = styled.div`
  margin-bottom: 16px;
`;

const DetailsRow = styled.div`
  display: flex;
  margin-bottom: 2px;
`;

const DetailsLabel = styled.div``;

const DetailsValue = styled.div`
  margin-left: auto;
  color: ${props => props.color};
`;

const AmountInputWrapper = styled.div`
  margin: 9px 0 4px;
`;

const InputLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 14px;
`;

const InputLabelStake = styled.div`
  color: #404efe;
`;

const ProviderWrapper = styled.div`
  display: flex;
  margin-top: 16px;
  align-items: center;
`;

const ProviderIcon = styled.div<any>`
  background-image: url(${props => props.iconUrl});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: ${props => props.iconBgColor || '#171322'};
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const ProviderName = styled.div`
  margin-left: 16px;
  font-size: 14px;
  opacity: 0.5;
`;

const StakeButtonWrapper = styled.div`
  margin-top: 24px;
`;

const StakeButton = styled(Button)`
  width: 100%;
  background: linear-gradient(0deg, rgb(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 100%),
    #5826ff;
`;

const DeprecationWarning = styled.div`
  border-radius: 0 0 8px 8px;
  color: #0b1422;
  background-color: #fc4a71;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  padding: 6px 30px;
  margin: 16px -16px -24px -16px;
`;

const iconByService = {
  cronservices: cronIcon,
  oracleservic: oracleIcon,
  ipfsservice1: ifpIcon,
  stakeservice: cronIcon,
  default: ifpIcon,
};

const colorByService = {
  cronservices: '#45D3C2',
  oracleservic: '#FC4A71',
  ipfsservice1: '#7D69FF',
  stakeservice: '#7D69FF',
  default: '#7D69FF',
};

type Props = {
  package: DappPackage | StakedPackage;
  details: {
    label: string;
    value: string;
  }[][];
  input: {
    placeholder: string;
  };
  button: {
    text: string;
    onClick: (...any) => any;
  };
  stakedDappAmount: number;
  stakedDappHdlAmount: number;
  showStakingIcon?: boolean;
  deprecated?: boolean;
};

class PackageCard extends React.Component<Props> {
  handleClickOutside = evt => {
    const { package: p } = this.props;
    if (p.isSelected) {
      p.handleDeselect(evt);
    }
  };

  render() {
    const {
      package: p,
      details,
      input,
      button,
      showStakingIcon = false,
      deprecated = false,
      stakedDappAmount,
      stakedDappHdlAmount
    } = this.props;

    const serviceIcon = iconByService[p.data.service] || iconByService.default;
    const serviceColor = colorByService[p.data.service] || colorByService.default;

    return (
      <CardWrapper onClick={p.handleSelect} isSelected={p.isSelected} isHidden={p.isHidden}>
        <TitleAndCheckboxWrapper isSelected={p.isSelected} onClick={p.handleDeselect}>
          <Title>{p.packageId.toUpperCase()}</Title>
          {showStakingIcon && <StakingIcon />}
          <img src={p.isSelected ? checkboxChecked : checkboxUnchecked} />
        </TitleAndCheckboxWrapper>

        <ServiceIconAndNameWrapper>
          <ServiceIcon src={serviceIcon} />
          <ServiceName color={serviceColor}>{p.data.service}</ServiceName>
        </ServiceIconAndNameWrapper>

        <DetailsWrapper>
          {details.map(detailBlock => (
            <DetailsBlock>
              {detailBlock.map(({ label, value }) => (
                <DetailsRow key={label}>
                  <DetailsLabel>{label}</DetailsLabel>
                  <DetailsValue color={serviceColor}>{value}</DetailsValue>
                </DetailsRow>
              ))}
            </DetailsBlock>
          ))}
        </DetailsWrapper>

        {p.isSelected && (
          <React.Fragment>
            <AmountInputWrapper>
              <InputLabelWrapper>
                <div>{button.text} DAPP</div>
                {<InputLabelStake>{formatAsset({ amount: stakedDappAmount, symbol: DAPP_SYMBOL }, { withSymbol: false, separateThousands: true })}</InputLabelStake>}
              </InputLabelWrapper>
              <Input
                name="dapp"
                value={p.packageStore.stakeValueDapp}
                onChange={p.packageStore.handleStakeValueChange}
                placeholder={input.placeholder}
                label="DAPP"
                autoFocus
              />
            </AmountInputWrapper>
            <AmountInputWrapper>
              <InputLabelWrapper>
                <div>{button.text} DAPPHDL</div>
                {<InputLabelStake>{formatAsset({ amount: stakedDappHdlAmount, symbol: DAPPHODL_SYMBOL }, { withSymbol: false, separateThousands: true })}</InputLabelStake>}
              </InputLabelWrapper>
              <Input
                name="dappHdl"
                value={p.packageStore.stakeValueDappHdl}
                onChange={p.packageStore.handleStakeValueChange}
                placeholder={input.placeholder}
                label="DAPPHDL"
              />
            </AmountInputWrapper>
          </React.Fragment>
        )}

        <ProviderWrapper>
          <ProviderIcon iconUrl={p.iconUrl} iconBgColor={p.iconBgColor} />
          <ProviderName>{p.data.provider}</ProviderName>
        </ProviderWrapper>

        {p.isSelected && (
          <StakeButtonWrapper>
            <StakeButton
              disabled={!p.packageStore.stakeValuesValid}
              color={serviceColor}
              onClick={button.onClick}
            >
              {button.text}
            </StakeButton>
          </StakeButtonWrapper>
        )}

        {deprecated && (
          <DeprecationWarning>
            Package is ending and deprecated, please consider selecting another one instead
          </DeprecationWarning>
        )}
      </CardWrapper>
    );
  }
}

export default onClickOutside(observer(PackageCard));
