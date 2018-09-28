import { colors } from '@0xproject/react-shared';
import { ObjectMap } from '@0xproject/types';
import * as _ from 'lodash';
import * as React from 'react';
import { DropDown } from 'ts/components/ui/drop_down';
import { Link } from 'ts/components/ui/link';
import { Deco, Key, WebsitePaths } from 'ts/types';
import { constants } from 'ts/utils/constants';
import { Translate } from 'ts/utils/translate';

interface LinkInfo {
    link: string;
    shouldOpenInNewTab?: boolean;
}

const gettingStartedKeyToLinkInfo1: ObjectMap<LinkInfo> = {
    [Key.BuildARelayer]: {
        link: `${WebsitePaths.Wiki}#Build-A-Relayer`,
    },
    [Key.OrderBasics]: {
        link: `${WebsitePaths.Wiki}#Create,-Validate,-Fill-Order`,
    },
};
const gettingStartedKeyToLinkInfo2: ObjectMap<LinkInfo> = {
    [Key.DevelopOnEthereum]: {
        link: `${WebsitePaths.Wiki}#Ethereum-Development`,
    },
    [Key.UseSharedLiquidity]: {
        link: `${WebsitePaths.Wiki}#Find,-Submit,-Fill-Order-From-Relayer`,
    },
};
const popularDocsToLinkInfos: ObjectMap<LinkInfo> = {
    [Key.ZeroExJs]: {
        link: WebsitePaths.ZeroExJs,
    },
    [Key.Connect]: {
        link: WebsitePaths.Connect,
    },
    [Key.SmartContract]: {
        link: WebsitePaths.SmartContracts,
    },
};
const usefulLinksToLinkInfo: ObjectMap<LinkInfo> = {
    [Key.Github]: {
        link: constants.URL_GITHUB_ORG,
        shouldOpenInNewTab: true,
    },
    [Key.Whitepaper]: {
        link: WebsitePaths.Whitepaper,
        shouldOpenInNewTab: true,
    },
    [Key.Sandbox]: {
        link: constants.URL_SANDBOX,
        shouldOpenInNewTab: true,
    },
};

interface DevelopersDropDownProps {
    translate: Translate;
    menuItemStyles: React.CSSProperties;
    menuIconStyle: React.CSSProperties;
}

interface DevelopersDropDownState {}

export class DevelopersDropDown extends React.Component<DevelopersDropDownProps, DevelopersDropDownState> {
    public render(): React.ReactNode {
        const activeNode = (
            <div className="flex relative" style={{ color: this.props.menuIconStyle.color }}>
                <div style={{ paddingRight: 10 }}>{this.props.translate.get(Key.Developers, Deco.Cap)}</div>
            </div>
        );
        return (
            <DropDown
                activeNode={activeNode}
                popoverContent={this._renderDropdownMenu()}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                style={this.props.menuItemStyles}
                popoverStyle={{ borderRadius: 4, width: 427, height: 373, marginTop: 10 }}
            />
        );
    }
    private _renderDropdownMenu(): React.ReactNode {
        const dropdownMenu = (
            <div>
                <div style={{ padding: '1.75rem' }}>
                    {this._renderTitle('Getting started')}
                    <div className="flex">
                        <div className="pr4 mr2">{this._renderLinkSection(gettingStartedKeyToLinkInfo1)}</div>
                        <div>{this._renderLinkSection(gettingStartedKeyToLinkInfo2)}</div>
                    </div>
                </div>
                <div
                    style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: colors.grey300,
                    }}
                />
                <div className="flex" style={{ padding: '1.75rem' }}>
                    <div className="pr4 mr2">
                        <div>{this._renderTitle('Popular docs')}</div>
                        <div>{this._renderLinkSection(popularDocsToLinkInfos)}</div>
                    </div>
                    <div>
                        <div>{this._renderTitle('Useful links')}</div>
                        <div>{this._renderLinkSection(usefulLinksToLinkInfo)}</div>
                    </div>
                </div>
                <div
                    style={{
                        padding: '1.125rem',
                        textAlign: 'center',
                        backgroundColor: colors.lightBgGrey,
                        borderBottomLeftRadius: 4,
                        borderBottomRightRadius: 4,
                    }}
                >
                    <Link
                        to={WebsitePaths.Docs}
                        className="text-decoration-none"
                        style={{
                            color: colors.lightBlueA700,
                            fontWeight: 'bold',
                            fontSize: 14,
                        }}
                    >
                        {this.props.translate.get(Key.ViewAllDocumentation, Deco.Upper)}
                    </Link>
                </div>
            </div>
        );
        return dropdownMenu;
    }
    private _renderTitle(title: string): React.ReactNode {
        return (
            <div
                style={{
                    color: colors.linkSectionGrey,
                    fontSize: 14,
                    paddingBottom: 12,
                    fontWeight: 600,
                    letterSpacing: 1,
                }}
            >
                {title.toUpperCase()}
            </div>
        );
    }
    private _renderLinkSection(keyToLinkInfo: ObjectMap<LinkInfo>): React.ReactNode {
        const linkStyle: React.CSSProperties = {
            color: colors.lightBlueA700,
            fontFamily: 'Roboto, Roboto Mono',
        };
        const numLinks = _.size(keyToLinkInfo);
        let i = 0;
        const links = _.map(keyToLinkInfo, (linkInfo: LinkInfo, key: string) => {
            i++;
            const isLast = i === numLinks;
            const linkText = this.props.translate.get(key as Key, Deco.Cap);
            return (
                <div className={`pr1 pt1 ${!isLast && 'pb1'}`} key={`dev-dropdown-link-${key}`}>
                    <Link
                        to={linkInfo.link}
                        isExternal={!!linkInfo.shouldOpenInNewTab}
                        shouldOpenInNewTab={linkInfo.shouldOpenInNewTab}
                        className="text-decoration-none"
                        style={linkStyle}
                    >
                        {linkText}
                    </Link>
                </div>
            );
        });
        return <div>{links}</div>;
    }
}
