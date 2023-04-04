import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from './tab';

type TabsProps = {
    children: JSX.Element[],
};

export function Tabs(props: TabsProps) {
    const { children } = props;
    const [activeTab, setActiveTab] = useState(children[0].props.label as string);

    const onClickTabItem = (tab: string) => {
        setActiveTab(tab);
    }

    return (
      <div className="tabs">
        <ol className="tab-list">
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={`tab-${label}`}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
        </ol>
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
}
