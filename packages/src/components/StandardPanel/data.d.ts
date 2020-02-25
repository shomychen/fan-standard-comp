import React from 'react';
import PropTypes from 'prop-types';
export interface StandardPanelProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    height?: Boolean;
    title?: any;
    badges?: badgesList[];
    cateConfig?: GroupList[];
    buttonConfig?: GroupList[];
    type?: string;
    postfix?: React.ReactNode;
}
export interface GroupList {
    activeKey?: string;
    list?: string[] | any;
    onChange?: () => void;
    className?: string;
}

export interface badgesList {
    value?: string;
    label?: string[] | any;
    color?: string;
}

export default class StandardPanel extends React.Component<StandardPanelProps, any> {}
